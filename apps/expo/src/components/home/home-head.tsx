import { Text, View } from "react-native";

import { useHomeCtx } from "~/hooks/use-home-hook";
import { Btn } from "../common/btn";
import { TimePicker } from "../date-time-picker";

export default function HomeHead() {
  // const currentClock = api.workSession.workStatus.useQuery();
  const ctx = useHomeCtx();
  const { workStatus, session, mutation } = ctx;

  function clockIn(value) {
    mutation.clockin({
      employeeProfileId: ctx.profileId,
      startTime: value,
    });
  }
  return (
    <View
      className="flex p-4 pb-16"
      style={{
        backgroundColor: "rgba(150,20,255, 0.2)", // Yellow with 70% opacity
        // height: Platform.OS === "ios" ? headerHeight + 80 : 200,
        zIndex: -1,
      }}
    >
      {workStatus?.current?.id ? (
        <View className="flex gap-6 py-4 pb-6">
          <View className="flex gap-1">
            <Text className="text-3xl font-bold">You are clocked in</Text>
            <Text className="text-xl font-medium">
              {workStatus.current?.totalWorkSecondsString}
            </Text>
          </View>
          <View className="flex-row gap-2">
            <TimePicker
              onOpen={ctx._freezeUI}
              className="flex-1"
              onChange={(value) => {
                if (workStatus.current?.currentBreakId)
                  mutation.resumeWork({
                    endTime: value,
                    id: workStatus.current.currentBreakId,
                  });
                else
                  mutation.break({
                    workSessionId: workStatus?.current?.id as any,
                    startTime: value,
                  });
              }}
              Toggle={({ onPress }) => (
                <Btn size={"lg"} onPress={onPress} className={"flex-1"}>
                  {workStatus?.current?.currentBreakId
                    ? "Back to Work"
                    : "Take a break"}
                </Btn>
              )}
            />
            <TimePicker
              className="flex-1"
              onOpen={ctx._freezeUI}
              onChange={(value) => {
                mutation.clockout({
                  endTime: value,
                  id: workStatus.current.id as any,
                  breakId: workStatus.current.currentBreakId as any,
                });
              }}
              Toggle={({ onPress }) => (
                <Btn
                  size={"lg"}
                  onPress={onPress}
                  className={"flex-1"}
                  variant={"outline"}
                >
                  Clock Out
                </Btn>
              )}
            />
          </View>
        </View>
      ) : (
        <>
          <View className="p-4">
            <Text className="text-balance text-xl">
              Good morning {`${session.data?.user?.name}`}!
            </Text>
            <Text>{session.data?.company?.name}</Text>
            <Text className="text-2xl font-bold text-black">
              Let's get to Work!
            </Text>
          </View>
          <TimePicker
            onOpen={ctx._freezeUI}
            onClose={ctx._unFreezeUI}
            onChange={clockIn}
            Toggle={({ onPress }) => (
              <Btn size="lg" onPress={onPress} className={"mb-4"}>
                Clock In
              </Btn>
              // <TouchableOpacity
              //   onPress={onPress}
              //   className="mb-4 flex-row items-center justify-center rounded bg-purple-700 p-4"
              // >
              //   <Text className="text-lg font-medium text-white">Clock In</Text>
              // </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}
