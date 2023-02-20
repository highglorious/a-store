import { FC, MouseEvent } from "react";
import { Gap } from "@alfalab/core-components/gap";
import { Link } from "@alfalab/core-components/link";
import { MailMIcon } from "@alfalab/icons-glyph/MailMIcon";
import { NavLink } from "react-router-dom";
import { PhoneMIcon } from "@alfalab/icons-glyph/PhoneMIcon";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel/responsive";
import { Typography } from "@alfalab/core-components/typography";
import { WhatsappMIcon } from "@alfalab/icons-logotype/WhatsappMIcon";
import "./SidePanel.css";

type SidePanelLinkProps = {
  title: string;
  path: string;
};

export type SidePanelProps = {
  view: boolean;
  handleView: () => void;
};

const SidePanelLink: FC<SidePanelLinkProps> = ({ title, path }) => {
  return (
    <NavLink className="side-panel-link" to={path}>
      {({ isActive }) => (
        <Typography.Title
          view="medium"
          weight="bold"
          tag="div"
          color="primary"
          id="target"
          className={
            isActive
              ? "side-panel-link__title_active"
              : "side-panel-link__title"
          }
        >
          {title}
        </Typography.Title>
      )}
    </NavLink>
  );
};

export const SidePanel: FC<SidePanelProps> = ({ view, handleView }) => {
  const handleClick = (e: MouseEvent<Element>) => {
    if ((e.target as Element).id === "target") handleView();
  };
  return (
    <div onClick={handleClick}>
      <SidePanelResponsive
        className="side-panel"
        open={view}
        onClose={handleView}
        size="s"
        placement={"right"}
        nativeScrollbar={true}
      >
        <SidePanelResponsive.Header hasCloser={true} sticky={true} />
        <SidePanelResponsive.Content>
          <div>
            <Gap size="m" />
            <SidePanelLink
              title="Сделано в Альфе"
              path="made-in-alfa"
            ></SidePanelLink>
            <Gap size="m" />
            <SidePanelLink
              title="Свой дизайн"
              path="custom-design"
            ></SidePanelLink>
            <Gap size="m" />
            <SidePanelLink title="Контакты" path="contact-us"></SidePanelLink>
          </div>
        </SidePanelResponsive.Content>
        <SidePanelResponsive.Footer sticky={true}>
          <div>
            <Typography.Text
              view="primary-small"
              weight="bold"
              tag="div"
              color="primary"
            >
              Политика конфиденциальности и обработки персональных данных
            </Typography.Text>
            <Gap size="s" />
            <div className="side-panel__icons">
              <Link
                rel="noopener"
                target="_blank"
                underline={false}
                href="mailto:info@alfabankstore.ru"
              >
                <MailMIcon />
              </Link>
              <Link
                rel="noopener"
                target="_blank"
                underline={false}
                href="tel:+7%20906%20061-60-20"
              >
                <PhoneMIcon />
              </Link>
              <Link
                rel="noopener"
                target="_blank"
                underline={false}
                href="https://wa.me/79060616020"
              >
                <WhatsappMIcon />
              </Link>
            </div>
          </div>
        </SidePanelResponsive.Footer>
      </SidePanelResponsive>
    </div>
  );
};
