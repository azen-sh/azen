"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "@/components/ui/button";

export default function ApiKeysManager() {
    const [loading, setLoading] = useState(false);
    const [keys, setKeys] = useState<any[]>();

    async function createKey() {
        setLoading(true);
        try {
            const res = await authClient.apiKey.create({
                name: `console-${Date.now()}`,
                expiresIn: 60 * 60 * 24 * 90,
                metadata: { createdFrom: 'console' },
            });
            console.log(res);
        } catch (e) {
            console.error(e);
        };
    };

    return (
        <div className="bg-black flex flex-col justify-center items-center text-white min-h-screen text-2xl">
            <h1>Api Key manager</h1>
            <Button 
            className="bg-white text-black"
            onClick={createKey}
            >Create api key</Button>
        </div>
    )
};