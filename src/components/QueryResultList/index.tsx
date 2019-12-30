import React from "react";
import { QueryResult } from "react-apollo";
import { useOnEndReached, IColor, Color } from "@cohubinc/cohub-utils";

import BasicList, { IBasicListProps } from "src/components/BasicList";

type IListProps<IItem> = Omit<IBasicListProps<IItem>, "loading" | "onRefresh">;

interface IQueryResultList<IItem> extends IListProps<IItem> {
  queryResult: QueryResult<any, any>;
  /** How do we access your data in the query response? */
  dataAccessorKey: string;
  tintColor?: IColor;
}
export default function QueryResultList<IItem>(props: IQueryResultList<IItem>) {
  const {
    queryResult: { fetchMore, variables, data, refetch },
    tintColor = Color.green300,
    dataAccessorKey,
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
      {...rest}
      data={nodes as IItem[]}
      tintColor={tintColor}
      onRefresh={refetch}
      onEndReached={onEndReached}
    />
  );
}
