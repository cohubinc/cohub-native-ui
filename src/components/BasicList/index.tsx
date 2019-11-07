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
type IFlatListProps<TItem> = Omit<
  FlatListProps<TItem | ILoaderRow>,
  "data" | "renderItem" | "refreshControl"
>;
export interface IBasicListProps<TItem> extends IFlatListProps<TItem> {
  loading?: boolean;
  data?: Array<TItem | ILoaderRow>;
  renderItem: ListRenderItem<TItem>;
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
    onEndReachedThreshold = 0.5,
    style,
    ...rest
  } = props;

  if (data.length && loading) {
    data = [...data, { isLoaderRow: true }];
  }

  return (
    <FlatList
      {...{
        onRefresh,
        data,
        keyExtractor,
        onEndReachedThreshold,
        onEndReached,
        ...rest
      }}
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
          refreshing={!!loading}
          onRefresh={onRefresh || undefined}
        />
      }
      ItemSeparatorComponent={() => <Divider />}
      refreshing={loading}
      onEndReachedThreshold={onEndReachedThreshold}
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
