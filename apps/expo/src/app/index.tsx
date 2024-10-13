import { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import HomeHead from "~/components/home/home-head";
import { HomeContext, useInitHomeContext } from "~/hooks/use-home-hook";
import { api } from "~/utils/api";

export default function HomeIndex() {
  const utils = api.useUtils();
  // const { colorScheme, setColorScheme } = useColorScheme();
  // const postQuery = api.workSession.all.useQuery();

  const ctx = useInitHomeContext();

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          statusBarColor: "rgba(150,20,255, 0.2)",
          // navigationBarColor: "white",
          headerTintColor: "black",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
      <HomeContext.Provider value={ctx}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={ctx.refreshing}
              onRefresh={ctx.onRefresh}
            />
          }
          className="bg-gray-50"
        >
          <HomeHead />
          <View className="relative flex-1" style={{ zIndex: 1 }}>
            <View className="z-10 -mt-16 w-full">
              <View className="mx-4 flex-1 rounded border border-muted-foreground bg-white p-4">
                <View className="">
                  <View className="mb-4 flex-row items-center justify-between">
                    <Text className="text-2xl font-medium text-gray-700">
                      Total working hour
                    </Text>
                  </View>
                  <View className="flex-row gap-4">
                    <View className="flex-1 flex-col justify-between border-r border-muted-foreground/50">
                      <Text className="text-base text-gray-700">Today</Text>
                      <Text className="text-lg font-bold text-gray-800">
                        {ctx.workStatus?.current?.totalWorkMinutesString}
                      </Text>
                    </View>
                    <View className="flex-1 flex-col justify-between">
                      <Text className="text-base text-gray-700">
                        This pay period
                      </Text>
                      <Text className="text-lg font-bold text-gray-800">
                        {ctx.workStatus?.payPeriod?.payableMinuteString}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="mt-6 rounded-lg bg-white p-4 shadow-sm">
                <Text className="mb-3 text-base text-muted-foreground">
                  Current pay period
                </Text>
                <View className="mb-8 flex-row items-center justify-between">
                  <Text className="text-2xl font-semibold text-gray-900">
                    Jul 01st - 31st, 2022
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-lg font-medium text-gray-900">
                      + Add Time
                    </Text>
                  </TouchableOpacity>
                </View>

                {ctx.workStatus?.list?.map((item, i) => (
                  <View
                    key={i}
                    className="mb-4 rounded border border-muted-foreground/50 p-4"
                  >
                    <View className="mb-4 flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className="text-base text-gray-500">
                          {item.date}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-base text-gray-500">
                          In & Out
                        </Text>
                      </View>
                    </View>

                    <View className="mb-4 flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className="text-2xl font-semibold text-gray-800">
                          {item.totalHrs} total hrs
                        </Text>
                      </View>
                      <View className="flex-1 flex-row items-center justify-center gap-2">
                        <Text className="text-lg font-medium">
                          {item.inTime}
                        </Text>
                        <Text className="text-sm font-medium">...</Text>
                        <Text className="text-lg font-medium">
                          {item.outTime}
                        </Text>
                      </View>
                    </View>

                    {/* <View className="mb-4 flex-row items-center justify-between">
                      <Text className="text-red-600">Rejected by</Text>
                      <Text className="text-sm text-gray-800">Jerome Bell</Text>
                    </View> */}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </HomeContext.Provider>
    </SafeAreaView>
  );
}
