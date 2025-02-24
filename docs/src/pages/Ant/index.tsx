import { Affix, Anchor, Button, Card, Checkbox, Radio, RadioChangeEvent, Space } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "umi";

import "./index.less";

import {
  ColorPreview,
  TypographyPreview,
  ButtonPreview,
  RadioPreview,
  CheckboxPreview,
  InputPreview,
  SwitchPreview,
  SliderPreview,
  DatePickerPreview,
  RatePreview,
  TransferPreview,
  TablePreview,
  TagPreview,
  ProgressPreview,
  TreePreview,
  PaginationPreview,
  BadgePreview,
  AlertPreview,
  SpinPreview,
  MessagePreview,
  NotificationPreview,
  TabsPreview,
  MenuPreview,
  TooltipPreview,
  PopoverPreview,
  CardPreview,
  CarouselPreview,
  CollapsePreview,
  AvatarPreview,
  DropdownPreview,
  StepPreview,
  CascaderPreview,
  SelectPreview,
  TreeSelectPreview,
  TimePickerPreview,
  CalendarPreview,
  ListPreview,
  TimelinePreview,
  PopconfirmPreview,
  ModalPreview,
  FormPreview,
} from "./previews";
import { useThemeContext } from "@/contexts/ThemeProvider";

const { Link } = Anchor;

const Ant = () => {
  const { theme, setTheme } = useThemeContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState(theme);

  useEffect(() => {
  }, [location]);

  const onChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setTheme(value);
  };

  return (
    <div style={{ marginRight: "0px", display: "flex", flexDirection: "column" }}>
      <div className="preview-header">
        <Affix>
          <div style={{ padding: "20px", width: "100%", backgroundColor: "#fff" }}>
            <Space align="center">
              主题色:
              <Radio.Group
                options={[
                  { label: "Purple", value: "purple" },
                  { label: "Red", value: "red" },
                  { label: "Blue", value: "blue" },
                ]}
                value={theme}
                onChange={onChange}
                optionType="button"
                buttonStyle="solid"
              />
            </Space>
          </div>
        </Affix>
      </div>

      {/* 组件 */}

      <div className="preview" style={{ flex: 1, overflow: "auto" }}>
        <section style={{ padding: "0px" }}>
          <ColorPreview />
          <TypographyPreview />
          <ButtonPreview disabled={disabled} size={size} />
          <RadioPreview disabled={disabled} size={size} />
          <CheckboxPreview disabled={disabled} size={size} />
          <InputPreview disabled={disabled} size={size} />
          <SelectPreview disabled={disabled} size={size} />
          <TreeSelectPreview disabled={disabled} size={size} />
          <SwitchPreview disabled={disabled} size={size} />
          <SliderPreview disabled={disabled} size={size} />
          <DatePickerPreview disabled={disabled} size={size} />
          <TimePickerPreview disabled={disabled} size={size} />
          <RatePreview disabled={disabled} size={size} />
          <StepPreview disabled={disabled} size={size} />
          <CascaderPreview disabled={disabled} size={size} />
          <DropdownPreview disabled={disabled} size={size} />
          <TransferPreview disabled={disabled} size={size} />
          {/* <FormPreview disabled={disabled} size={size} /> */}
          <TablePreview disabled={disabled} size={size} />
          <PaginationPreview disabled={disabled} size={size} />
          <ProgressPreview disabled={disabled} size={size} />
          <TreePreview disabled={disabled} size={size} />
          <SpinPreview disabled={disabled} size={size} />
          <TabsPreview disabled={disabled} size={size} />
          <MenuPreview disabled={disabled} size={size} />
          <CardPreview disabled={disabled} size={size} />
          <CarouselPreview disabled={disabled} size={size} />
          <CollapsePreview disabled={disabled} size={size} />
          <AvatarPreview disabled={disabled} size={size} />
          <CalendarPreview disabled={disabled} size={size} />
          <ListPreview disabled={disabled} size={size} />
          <TimelinePreview disabled={disabled} size={size} />
          <TagPreview disabled={disabled} size={size} />
          <BadgePreview disabled={disabled} size={size} />
          <AlertPreview disabled={disabled} size={size} />
          <MessagePreview disabled={disabled} size={size} />
          <NotificationPreview disabled={disabled} size={size} />
          <TooltipPreview disabled={disabled} size={size} />
          <PopoverPreview disabled={disabled} size={size} />
          <PopconfirmPreview disabled={disabled} size={size} />
          <ModalPreview disabled={disabled} size={size} />
        </section>
      </div>

      {/* <Affix > */}
      <Anchor affix={false} style={{ position: "fixed", right: 0, top: 20, width: 200 }}>
        <Link href="#Color" title="Color" />
        <Link href="#Typography" title="Typography" />

        <Link href="#Button" title="Button" />
        <Link href="#Radio" title="Radio" />
        <Link href="#Checkbox" title="Checkbox" />
        <Link href="#Input" title="Input" />
        <Link href="#Select" title="Select" />
        <Link href="#TreeSelect" title="TreeSelect" />
        <Link href="#Cascader" title="Cascader" />
        <Link href="#Switch" title="Switch" />
        <Link href="#DatePicker" title="DatePicker" />
        <Link href="#TimePicker" title="TimePicker" />
        <Link href="#Slider" title="Slider" />
        <Link href="#Dropdown" title="Dropdown" />
        <Link href="#Rate" title="Rate" />
        <Link href="#Steps" title="Steps" />
        <Link href="#Transfer" title="Transfer" />
        <Link href="#Form" title="Form" />

        <Link href="#Menu" title="Menu" />
        <Link href="#Tabs" title="Tabs" />
        <Link href="#Table" title="Table" />
        <Link href="#Pagination" title="Pagination" />
        <Link href="#Progress" title="Progress" />
        <Link href="#Tree" title="Tree" />
        <Link href="#Card" title="Card" />
        <Link href="#List" title="List" />
        <Link href="#Calendar" title="Calendar" />
        <Link href="#Avatar" title="Avatar" />
        <Link href="#Spin" title="Spin" />
        <Link href="#Collapse" title="Collapse" />
        <Link href="#Carousel" title="Carousel" />
        <Link href="#Timeline" title="Timeline" />

        <Link href="#Badge" title="Badge" />
        <Link href="#Alert" title="Alert" />
        <Link href="#Message" title="Message" />
        <Link href="#Notification" title="Notification" />
        <Link href="#Tag" title="Tag" />
        <Link href="#Tooltip" title="Tooltip" />
        <Link href="#Popover" title="Popover" />
        <Link href="#Modal" title="Modal" />
        <Link href="#Popconfirm" title="Popconfirm" />
      </Anchor>
      {/* </Affix> */}
    </div>
  );
};

export default Ant;
