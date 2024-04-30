import { useToast } from "@chakra-ui/react";
import React from "react";
import config from "configs/app";
import IconSvg from "ui/shared/IconSvg";
import { browserName } from "react-device-detect";
import * as mixpanel from "lib/mixpanel/index";

const NetworkAddToWallet = () => {
  const toast = useToast();

  const networks = {
    edexaUniverse: {
      chainId: `0x${Number(5424).toString(16)}`,
      chainName: "edeXa Network",
      nativeCurrency: {
        name: "EDX",
        symbol: "EDX",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.edexa.network/rpc"],
      blockExplorerUrls: ["https://explorer.edexa.network/"],
    },
  };

  const changeNetwork = async ({ networkName }: any) => {
    try {
      if (!window?.ethereum) throw new Error("No crypto wallet found");
      await window?.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          // @ts-ignore
          { ...networks[networkName] },
        ],
      });
      toast({
        position: "top-right",
        title: "Success",
        description: "Successfully added network to your wallet",
        status: "success",
        variant: "subtle",
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        position: "top-right",
        title: "Error",
        description: (err.stack as Error)?.message || "Something went wrong",
        status: "error",
        variant: "subtle",
        isClosable: true,
      });
    }
  };

  const handleClick = async (networkName: string) => {
    try {
      if (window?.ethereum) {
        window?.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result: any) => {
            mixpanel.logEvent(mixpanel.EventTypes.ADD_TO_WALLET, {
              Target: "network",
              Wallet: result[0],
            });
          })
          .catch((err: any) => {
            return err;
          });
      } else {
        if (browserName === "Chrome") {
          window.open(
            "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
            "_blank" // <- This is what makes it open in a new window.
          );
        } else if (browserName === "Firefox") {
          window.open(
            "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/",
            "_blank"
          );
        } else if (browserName === "Edge") {
          window.open(
            "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US",
            "_blank"
          );
        } else if (browserName === "Brave") {
          window.open(
            "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
            "_blank"
          );
        } else {
          window.open("https://metamask.io/download/", "_blank");
        }
      }
      await changeNetwork({ networkName });
    } catch (error) {
      toast({
        position: "top-right",
        title: "Error",
        description: (error as Error)?.message || "Something went wrong",
        status: "error",
        variant: "subtle",
        isClosable: true,
      });
    }
  };
  return (
    <button
      style={{
        color: "white",
        fontSize: "0.875rem",
        background: "#2B6CB0",
        height: "2.5rem",
        position: "relative",
        outline: "2px solid transparent",
        lineHeight: "1.2",
        borderRadius: "8px",
        paddingInlineStart: "1rem",
        paddingInlineEnd: "1rem",
        fontWeight: "600",
        alignItems: "center",
        display: "inline-flex",
        borderWidth: "0",
        borderStyle: "solid",
      }}
      onClick={() => handleClick("edexaUniverse")}
    >
      <IconSvg name={"wallets/metamask"} boxSize={5} mr={2} />
      Add {config.chain.name}
    </button>
  );
};

export default React.memo(NetworkAddToWallet);
