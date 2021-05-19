import { ClientSafeProvider, getProviders } from "next-auth/client";
import React, { useEffect, useState } from "react";

import { SignInModal } from "modules/modals/components";

export const SignInModalContainer: React.FC = () => {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider>>();

  useEffect(() => {
    const initProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    initProviders();
  }, []);

  return <SignInModal providers={providers} />;
};
