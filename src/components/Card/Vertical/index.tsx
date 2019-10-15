import React, { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

import Typography from "src/components/Typography";
import Avatar from "src/components/Avatar";
import BoxShadow, { ElevationLevel } from "src/definitions/enums/BoxShadow";
import useMediaQueries from "src/hooks/useMediaQueries";
import styles from "./Vertical.module.scss";
import { Buttons } from "src";
import Color from "src/definitions/enums/Color";

export interface IVerticalCardProps {
  /**
   * The main identifying text
   */
  title: string;
  /**
   * If true, centers the title, subtitle, and meta text
   */
  centered?: boolean;
  /**
   * If true, formats the title as a link
   */
  titleLink?: string;
  subtitle?: string | ReactNode;
  meta?: string;
  /**
   * An array of objects that each have a name and an action. The action is usually a function, but doesn't have to be
   */
  actions?: Array<{ name: string; action: () => void; disabled?: boolean }>;
  /**
   * A url for the card's image
   */
  imageUrl?: string | null;
  /**
   * If true, puts the image in a circular element with a slightly inset shadow
   */
  avatar?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  /**
   * The level of drop shadow that shows beneath the card
   */
  elevation?: ElevationLevel;
}

export default function Vertical({
  title,
  subtitle,
  meta,
  titleLink,
  actions,
  avatar,
  imageUrl,
  className,
  style,
  children,
  centered,
  elevation = 1
}: IVerticalCardProps) {
  const { isMobile } = useMediaQueries();

  const cardWidth = isMobile ? "100%" : "240px";

  const dpLevel = `dp${elevation}` as any;

  let actionList;

  if (actions) {
    actionList = actions.map(a => {
      return (
        <Buttons.Text
          className={styles.CardAction}
          key={a.name}
          onClick={() => a.action()}
          fontSize={12}
          disabled={!!a.disabled}
          color={Color.iconGrey as any}
        >
          {a.name}
        </Buttons.Text>
      );
    });
  }

  const titleLinkElement = () => {
    if (titleLink) {
      return (
        <Link to={titleLink}>
          <Typography.Large block alignment={centered ? "center" : "left"}>
            {title}
          </Typography.Large>
        </Link>
      );
    } else {
      return (
        <Typography.Large block alignment={centered ? "center" : "left"}>
          {title}
        </Typography.Large>
      );
    }
  };

  const cardContent = (
    <React.Fragment>
      <div className="m-auto block">
        {avatar && <Avatar size={150} src={imageUrl} className="mt-1" />}
        {!avatar && imageUrl && (
          <div>
            <img style={{ maxWidth: "100%" }} src={imageUrl} className="p-1" />
          </div>
        )}
      </div>
      <div className="mx-1 mt-05">
        {titleLinkElement()}
        <Typography.Small
          block
          alignment={centered ? "center" : "left"}
          style={{ marginRight: "0.25rem" }}
        >
          {subtitle}
        </Typography.Small>
        {meta && (
          <Typography.Tiny
            muted
            block
            alignment={centered ? "center" : "left"}
            style={{ marginRight: "0.25rem" }}
          >
            {meta}
          </Typography.Tiny>
        )}
        {children && <div className="mt-1">{children}</div>}
        {actions && (
          <div className="flex justify-evenly mt-1">{actionList}</div>
        )}
      </div>
    </React.Fragment>
  );

  return (
    <div
      className={`${styles.CardVertical} ${className} pb-1`}
      style={{
        ...style,
        boxShadow: (BoxShadow as any)[dpLevel as any] || BoxShadow.dp1,
        width: cardWidth
      }}
    >
      {cardContent}
    </div>
  );
}
