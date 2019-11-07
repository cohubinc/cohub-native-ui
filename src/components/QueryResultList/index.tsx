import React from "react";
import { QueryResult } from "react-apollo";
import { useOnEndReached } from "@cohubinc/cohub-utils";

import BasicList, { IBasicListProps } from "src/components/BasicList";

type IListProps<IItem> = Omit<IBasicListProps<IItem>, "loading" | "onRefresh">;

interface IQueryResultList<IItem> extends IListProps<IItem> {
  queryResult: QueryResult<any, any>;
  /** How do we access your data in the query response? */
  dataAccessorKey: string;
}
export default function QueryResultList<IItem>(props: IQueryResultList<IItem>) {
  const {
    queryResult: { fetchMore, variables, data, loading, refetch },
    dataAccessorKey,
    renderItem,
    ...rest
  } = props;

  const onEndReached = useOnEndReached({
    key: dataAccessorKey,
    data,
    variables,
    fetchMore
  });

  const payload = data && data[dataAccessorKey];

  const nodes =
    (payload && payload.edges && payload.edges.map(({ node }: any) => node)) ||
    [];

  return (
    <BasicList
      data={nodes as IItem[]}
      {...{ loading, renderItem, ...rest }}
      onRefresh={refetch}
      onEndReached={onEndReached}
    />
  );
}
