import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "./style.less";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ShowSource from "@/components/ShowSource";
import SvgUnExpandURL, { ReactComponent as SvgUnExpand } from "@/assets/unexpand.svg";

interface PreviewWrapperProps {
  id: string;
  title: string;
  children?: React.ReactNode;
}

const PreviewWrapper: React.FC<PreviewWrapperProps> = ({ id, title, children }) => {
  const [expand, setExpand] = useState(false);

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(children as string);
  // };

  const handleExpand = (e) => {
    e.stopPropagation();
    setExpand(!expand);
  };

  return (
    <section id={id} className="component-preview">
      <Card className="component-preview" bordered={false} title={title}>
        {children}
        {/* <div className="component-preview-code">
          <div className="component-preview-code-actions">
            <Tooltip placement="top" title={"复制代码"}>
              <span className="code-icon code-copy-icon">
                <CopyToClipboard text={children as string}>
                  <CopyOutlined />
                </CopyToClipboard>
              </span>
            </Tooltip>

            <Tooltip placement="top" title={expand ? "收起代码" : "显示代码"}>
              <span className="code-icon code-expand-icon" onClick={(e) => handleExpand(e)}>
                <img src={SvgUnExpandURL} alt="" />
              </span>
            </Tooltip>
          </div>
          <div className={`component-preview-code-content-${expand ? "expand" : "collapse"}`}>
            <pre>
              <code>
                <ShowSource>{children}</ShowSource>
              </code>
            </pre>
          </div>
        </div> */}
      </Card>
    </section>
  );
};

export default PreviewWrapper;
