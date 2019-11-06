import React from "react";
import { QueryResult } from "react-apollo";
import { useOnEndReached } from "@cohubinc/cohub-utils";

import BasicList, { IBasicListProps } from "src/components/BasicList";

type IListProps<IItem> = Omit<IBasicListProps<IItem>, "loading" | "onRefresh">;

interface INode<IItem>  {
  node: IItem;
};
interface IEdgeNode<IItem> {
  edges?: {
    nodes: Array<INode<IItem>>;
  };
}
interface IResultType<IItem> {
  pageInfo: {};
  [key: string]: IEdgeNode<IItem>;
}

interface IQueryResultList<IItem> extends IListProps<IItem> {
  queryResult: QueryResult<IResultType<IItem>, any>;
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

  const nodes = data && (data[dataAccessorKey] as IEdgeNode<IItem>).edges?.nodes.map(({node}) => node) || []

  const onEndReached = useOnEndReached({
    key: dataAccessorKey,
    data,
    variables,
    fetchMore
  });

  return (
    <BasicList
      data={nodes}
      {...{ loading, renderItem, ...rest }}
      onRefresh={refetch}
      onEndReached={onEndReached}
    />
  );
}
