import { createContext, useContext, useEffect, useState } from "react";

import { secondsString } from "@acme/utils-module";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type IWorkStatusQuery = RouterOutputs["workSession"]["workStatus"];
export const HomeContext = createContext<ReturnType<typeof useInitHomeContext>>(
  null as any,
);
export const useHomeCtx = () => useContext(HomeContext);
export function useInitHomeContext() {
  const session = api.auth.exampleSession.useQuery();
  const [refreshing, setRefreshing] = useState(false);
  const [workStatus, setWorkStatus] = useState<IWorkStatusQuery | null>();

  const workStatusQuery = api.workSession.workStatus.useQuery();
  const onRefresh = async () => {
    setRefreshing(true);
    const refetchData = await workStatusQuery.refetch();
    setWorkStatus(refetchData.data);
    setRefreshing(false);
  };
  useEffect(() => {
    setWorkStatus(workStatusQuery.data);
  }, [workStatusQuery.data]);
  const INTERVAL_MS = 1000;
  const [freezeUI, setFreezeUI] = useState(false);
  useEffect(() => {
    if (workStatus) {
      const intervalId = setInterval(() => {
        if (freezeUI) return;
        // if (!workStatus?.current?.currentBreakId)
        setWorkStatus((prevStatus) => {
          if (prevStatus) {
            const newStatus = { ...prevStatus };
            if (!newStatus.current.currentBreakId) {
              let seconds = newStatus.current.totalSeconds;
              if (seconds && seconds > 0) {
                seconds += INTERVAL_MS / 1000;
                newStatus.current.totalSeconds = seconds;
                newStatus.current.totalWorkSecondsString =
                  secondsString(seconds);
              }
            }
            return {
              ...prevStatus,
            };
          }
          return null;
        });
      }, INTERVAL_MS);
      return () => clearInterval(intervalId);
    }
  }, [workStatus, freezeUI]);

  function onSuccess() {
    setTimeout(() => {
      workStatusQuery.refetch();
      setFreezeUI(false);
    }, 500);
  }
  const { mutate: clockinMutate, error } = api.workSession.clockIn.useMutation({
    onSuccess,
  });
  const { mutate: breakMutate } = api.workSession.takeBreak.useMutation({
    onSuccess,
  });
  const { mutate: resumeMutate } = api.workSession.backToWork.useMutation({
    onSuccess,
  });
  const { mutate: clockoutMutate } = api.workSession.clockOut.useMutation({
    onSuccess,
  });

  return {
    profileId: session.data?.profile.id as any,
    _freezeUI() {
      setFreezeUI(true);
    },
    _unFreezeUI() {
      setFreezeUI(false);
    },
    refreshing,
    onRefresh,
    workStatus,
    workStatusQuery,
    session,
    mutation: {
      clockin: clockinMutate,
      clockout: clockoutMutate,
      resumeWork: resumeMutate,
      break: breakMutate,
    },
  };
}
