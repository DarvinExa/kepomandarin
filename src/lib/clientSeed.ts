"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
let globalClientSeed = 0;

function getClientSeedSnapshot(): number {
  if (globalClientSeed === 0) {
    globalClientSeed = Math.floor(Math.random() * 100000) + 1;
  }
  return globalClientSeed;
}

function getServerSeedSnapshot(): number {
  return 0;
}

export function useClientSeed(): number {
  return useSyncExternalStore(emptySubscribe, getClientSeedSnapshot, getServerSeedSnapshot);
}
