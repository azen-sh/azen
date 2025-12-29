import {
  Html,
  Head,
  Tailwind,
  Body,
  Img,
} from "@react-email/components";
import React from "react";

interface MagicLinkLoginProps {
  url: string;
  email?: string;
}

export default function MagicLinkLogin({ url, email }: MagicLinkLoginProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-neutral-100 py-12">

          <table width="100%" cellPadding="0" cellSpacing="0">
            <tr>
              <td align="center">

                <table
                  width="480"
                  cellPadding="0"
                  cellSpacing="0"
                  className="bg-neutral-950 border border-neutral-800 rounded-xl"
                >
                  <tr>
                    <td className="px-8 py-10 text-center">

                      <table width="100%" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td align="center" className="pb-6">
                            <Img
                              src="https://azen.sh/favicon.ico"
                              width="32"
                              height="32"
                              alt="Azen"
                              style={{ display: "inline-block", verticalAlign: "middle" }}
                            />
                            <span
                              style={{
                                display: "inline-block",
                                marginLeft: "8px",
                                fontSize: "18px",
                                fontWeight: 500, 
                                color: "#ffffff",
                                verticalAlign: "middle",
                              }}
                            >
                              Azen
                            </span>
                          </td>
                        </tr>
                      </table>

                      <h1 className="text-2xl font-medium text-white mb-2">
                        Sign in to Azen
                      </h1>

                      <p className="text-sm text-neutral-400 mb-8">
                        Developer-first memory infrastructure for AI
                      </p>

                      <p className="text-neutral-300 mb-6">
                        Click the button below to sign in{" "}
                        {email && (
                          <span className="text-white font-medium">{email}</span>
                        )}.
                      </p>

                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full rounded-md bg-white py-3 text-sm font-medium text-black"
                      >
                        Continue to Azen →
                      </a>

                      <p className="text-xs text-neutral-500 mt-6">
                        This login link expires in{" "}
                        <span className="text-neutral-300">15 minutes</span>.
                        <br />
                        If you didn&apos;t request this, you can safely ignore this email.
                      </p>

                      <table width="100%" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td className="border-t border-neutral-800 my-6" />
                        </tr>
                      </table>

                      <p className="text-xs text-neutral-500">
                        © 2025 Azen. All rights reserved.
                      </p>

                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>

        </Body>
      </Tailwind>
    </Html>
  );
}
