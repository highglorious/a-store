import { Gap } from "@alfalab/core-components/gap";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel/responsive";
import { Typography } from "@alfalab/core-components/typography";
import { Link } from "react-router-dom";
import { Link as LinkA } from "@alfalab/core-components/link";
import { SidePanelProps } from "../../routes/root/Root";
import "./SidePanel.css";
import { PhoneMIcon } from "@alfalab/icons-glyph/PhoneMIcon";
import { MailMIcon } from "@alfalab/icons-glyph/MailMIcon";
import { WhatsappMIcon } from "@alfalab/icons-logotype/WhatsappMIcon";
import { MouseEvent } from "react";

type SidePanelLinkProps = {
  title: string;
  path: string;
};
const SidePanelLink = ({ title, path }: SidePanelLinkProps) => {
  return (
    <Link style={{ textDecoration: "none" }} to={path}>
      <Typography.Title
        view="medium"
        weight="bold"
        tag="div"
        color="primary"
        id="target"
      >
        {title}
      </Typography.Title>
    </Link>
  );
};

export const SidePanel = ({ view, handleView }: SidePanelProps) => {
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
              <LinkA
                rel="noopener"
                target="_blank"
                underline={false}
                href="mailto:info@alfabankstore.ru"
              >
                <MailMIcon />
              </LinkA>
              <LinkA
                rel="noopener"
                target="_blank"
                underline={false}
                href="tel:+7%20906%20061-60-20"
              >
                <PhoneMIcon />
              </LinkA>
              <LinkA
                rel="noopener"
                target="_blank"
                underline={false}
                href="https://wa.me/79060616020"
              >
                <WhatsappMIcon />
              </LinkA>
            </div>
          </div>
        </SidePanelResponsive.Footer>
      </SidePanelResponsive>
    </div>
  );
};
