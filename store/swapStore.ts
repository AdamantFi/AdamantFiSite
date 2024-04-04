import { create } from "zustand";
import {
  SecretString,
  SharedSettings,
  StoreState,
  TokenInputState,
  TokenInputs,
} from "@/types";
import updateState from "@/store/utils/updateState";

export const useStore = create<StoreState>((set) => ({
  tokenInputs: {
    "swap.pay": {
      token: {
        symbol: "sSCRT",
        address: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
      },
      amount: "",
    },
    "swap.receive": {
      token: {
        symbol: "SEFI",
        address: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
      },
      amount: "",
    },
  },
  sharedSettings: {
    slippage: 0.5,
    gas: 0,
  },
  wallet: {
    address: null,
    SCRTBalance: "0",
    ADMTBalance: "0",
  },
  swappableTokens: [],
  chainId: "secret-4",
  connectionRefused: false,
  setTokenInputProperty: <T extends keyof TokenInputState>(
    inputIdentifier: keyof TokenInputs,
    property: T,
    value: TokenInputState[T]
  ) =>
    set((state) =>
      updateState(state, "tokenInputs", inputIdentifier, {
        token: state.tokenInputs[inputIdentifier].token,
        amount: state.tokenInputs[inputIdentifier].amount,
        [property]: value,
      })
    ),

  setSharedSetting: <T extends keyof SharedSettings>(
    setting: T,
    value: SharedSettings[T]
  ) => set((state) => updateState(state, "sharedSettings", setting, value)),

  connectWallet: (address: SecretString) =>
    set((state) => updateState(state, "wallet", "address", address)),

  disconnectWallet: () =>
    set((state) => updateState(state, "wallet", "address", null)),

  updateBalance: (tokenSymbol: "SCRT" | "ADMT", balance: string) =>
    set((state) =>
      updateState(state, "wallet", `${tokenSymbol}Balance`, balance)
    ),

  setSwappableTokens: (tokens) => set({ swappableTokens: tokens }),
  setChainId: (chainId) => set({ chainId }),
  setConnectionRefused: (refused) => set({ connectionRefused: refused }),
}));
