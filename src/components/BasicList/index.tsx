import React, { useState } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  View,
  ListRenderItemInfo,
  RefreshControl
} from "react-native";
import { Color } from "@cohubinc/cohub-utils";

import Loader from "src/components/Loader";
import Divider from "src/components/Divider";

interface ILoaderRow {
  isLoaderRow?: boolean;
}
type IOnEndReachedCallback<Resp = void> = (info: {
  distanceFromEnd: number;
}) => Resp;
type IFlatListProps<TItem> = Omit<
  FlatListProps<TItem | ILoaderRow>,
  "data" | "renderItem" | "onEndReached" | "refreshControl"
>;
export interface IBasicListProps<TItem> extends IFlatListProps<TItem> {
  loading?: boolean;
  data?: Array<TItem | ILoaderRow>;
  renderItem: ListRenderItem<TItem>;
  onEndReached?:
    | IOnEndReachedCallback
    | IOnEndReachedCallback<Promise<() => void>>;
}
export default function BasicList<TItem>(props: IBasicListProps<TItem>) {
  let {
    keyExtractor = defaultKeyExtractor,
    data = [],
    renderItem,
    onEndReached,
    loading,
    onRefresh,
    ItemSeparatorComponent,
    style,
    ...rest
  } = props;

  const [fetchingMore, setFetchingMore] = useState(false);

  if (data.length && fetchingMore) {
    data = [...data, { isLoaderRow: true }];
  }
  const isLoading = loading || fetchingMore;

  return (
    <FlatList
      {...{ onRefresh, data, keyExtractor, ...rest }}
      style={[style]}
      renderItem={rowData => {
        const { item } = rowData;
        if ("isLoaderRow" in item && item.isLoaderRow) {
          return <LoadingIndicatorRow />;
        }

        return renderItem(rowData as ListRenderItemInfo<TItem>);
      }}
      refreshControl={
        <RefreshControl
          tintColor={Color.green300 as any}
          refreshing={isLoading}
          onRefresh={onRefresh || undefined}
        />
      }
      ItemSeparatorComponent={() => <Divider />}
      refreshing={isLoading}
      onEndReachedThreshold={0.5}
      onEndReached={async info => {
        if (!onEndReached) return;
        setFetchingMore(true);
        await onEndReached(info);
        setFetchingMore(false);
      }}
    />
  );
}

const LoadingIndicatorRow = () => (
  <View
    style={[
      {
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        marginBottom: 15
      }
    ]}
  >
    <Loader size={15} />
  </View>
);

type IRowItem<TItem> = {
  id?: string | number;
} & TItem;

function defaultKeyExtractor<TItem>(item: IRowItem<TItem>, index: number) {
  return (item && item.id ? item.id : index).toString();
}
