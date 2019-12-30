import React, { useEffect, useRef } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  View,
  ListRenderItemInfo,
  RefreshControl
} from "react-native";
import { Color, IColor } from "@cohubinc/cohub-utils";

import Loader from "src/components/Loader";
import Divider from "src/components/Divider";
import eventEmitter from "src/helpers/eventEmitter";

const SCROLL_TO_TOP_EVENT = "cohub-basic-list-scroll-to-top";

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
  tintColor?: IColor;
}
export default function BasicList<TItem>(props: IBasicListProps<TItem>) {
  let {
    keyExtractor = defaultKeyExtractor,
    data = [],
    renderItem,
    loading,
    onRefresh,
    ItemSeparatorComponent = () => <Divider />,
    onEndReachedThreshold = 0.5,
    tintColor = Color.green300,
    ...rest
  } = props;

  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    function scrollToTop() {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
    eventEmitter.on("cohub-basic-list-scroll-to-top", scrollToTop);

    return () => {
      eventEmitter.removeListener(
        "cohub-basic-list-scroll-to-top",
        scrollToTop
      );
    };
  }, []);

  if (data.length && loading) {
    data = [...data, { isLoaderRow: true }];
  }

  return (
    <FlatList
      ref={flatListRef}
      {...{
        data,
        keyExtractor,
        onEndReachedThreshold,
        ItemSeparatorComponent,
        ...rest
      }}
      renderItem={rowData => {
        const { item } = rowData;
        if ("isLoaderRow" in item && item.isLoaderRow) {
          return <LoadingIndicatorRow />;
        }

        return renderItem(rowData as ListRenderItemInfo<TItem>);
      }}
      refreshControl={
        <RefreshControl
          tintColor={tintColor as any}
          refreshing={!!loading}
          onRefresh={props.onRefresh || undefined}
        />
      }
      refreshing={loading}
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

/**
 * Scroll BasicList and or QueryResultList to top
 */
export function scrollListToTop() {
  eventEmitter.emit(SCROLL_TO_TOP_EVENT);
}
