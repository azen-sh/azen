"use client";

import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "@/components/ui/button";

export default function ApiKeysManager() {
    const [loading, setLoading] = useState(false);
    const [createdKey, setCreatedKey] = useState<string | null>(null);
    const [keys, setKeys] = useState<any[] | null>();

    async function loadKeys() {
        try {
            const res = await authClient.apiKey.list();
            console.log(res);
            setKeys(res.data ?? []);
        } catch (e) {
            console.error(e);
        };
    };

    async function createKey() {
        setLoading(true);
        try {
            const res = await authClient.apiKey.create({
                name: `console-${Date.now()}`,
                expiresIn: 60 * 60 * 24 * 365,
                prefix: 'az_',
                metadata: { createdFrom: 'console' },
            });
            console.log(res.data);
            setCreatedKey(res.data?.key ?? null);
            await loadKeys();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        };
    };

    async function revokeKey(keyId: string) {
        await authClient.apiKey.delete({ keyId });
        await loadKeys();
    };

    useEffect(() => {
        
    }, []);

    return (
        <div className="bg-black flex flex-col justify-center items-center min-h-screen text-white text-2xl">
            <h1>Api Key manager</h1>
            <Button 
            className="bg-white text-black"
            onClick={createKey}
            disabled={loading}
            >
                {loading ? "Creating" : "Create Api Key"}
            </Button>
            
            {createdKey && (
                <div>
                  <strong>Copy this key now — you will see it only once</strong>
                  <pre>{createdKey}</pre>
                  <button
                  onClick={() => navigator.clipboard.writeText(createdKey)}  
                  >
                    Copy
                </button>
                </div>
            )}

            <h4>Your keys</h4>
             <ul>
                {keys?.map(k => (
                    <li key={k.id}>
                      <div>{k.name}</div>
                      <Button 
                      className="bg-white text-black"
                      onClick={() => revokeKey(k.id)}
                      >
                        Revoke key
                      </Button>
                    </li>
                ))}
             </ul>
        </div>
    )
};