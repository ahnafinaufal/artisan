import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Checkbox,
  CheckboxGroup,
  Chip,
  CloseButton,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ComboBox,
  DateField,
  DatePicker,
  DateRangePicker,
  Description,
  Disclosure,
  Drawer,
  Dropdown,
  ErrorMessage,
  FieldError,
  Fieldset,
  Form,
  Input,
  InputGroup,
  InputOTP,
  Kbd,
  Label,
  Link,
  ListBox,
  Meter,
  Modal,
  NumberField,
  Pagination,
  Popover,
  ProgressBar,
  ProgressCircle,
  Radio,
  RadioGroup,
  RangeCalendar,
  ScrollShadow,
  SearchField,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Surface,
  Switch,
  Table,
  Tabs,
  Tag,
  TagGroup,
  TextArea,
  TextField,
  TimeField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  toast,
} from "@heroui/react";
import { Lock, Mail, Sparkles } from "lucide-react";
import { EmojiReactionButton } from "../atoms/EmojiReactionButton";
import { ChartTooltip } from "./ChartTooltip";
import { ChatMessageBubble, KpiCard } from "./ProMolecules";
import { SidebarNavItem } from "./SidebarNavItem";
import {
  ComposedChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialChart,
} from "../organisms/charts";
import {
  AppLayoutPreview,
  DataGridPreview,
  DropZoneCard,
  MiniAreaChart,
  MiniBarChart,
  PromptInputBox,
  RichTextEditorCard,
} from "../organisms/ProOrganisms";

export interface ComponentPreviewProps {
  name: string;
  isPro?: boolean;
}

/**
 * Molecule: ComponentPreview
 * Merender preview visual interaktif dari komponen HeroUI v3 (dan implementasi custom Atomic untuk komponen Pro).
 */
export function ComponentPreview({ name, isPro }: ComponentPreviewProps) {
  const proPreview = renderProCustomPreview(name);
  if (proPreview) {
    return (
      <div className="flex min-h-[112px] w-full items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-surface-secondary/60 p-3">
        {proPreview}
      </div>
    );
  }

  if (isPro) {
    return (
      <div className="flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface-secondary/70 p-4 text-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-muted shadow-xs">
          <Lock className="h-4 w-4" />
        </div>
        <span className="text-xs font-medium text-muted">
          HeroUI Pro Component
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-[112px] w-full items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-surface-secondary/60 p-3">
      {renderFreePreview(name)}
    </div>
  );
}

function renderProCustomPreview(name: string) {
  switch (name) {
    case "EmojiReactionButton":
      return (
        <div className="flex items-center gap-2">
          <EmojiReactionButton emoji="🔥" initialCount={12} defaultReacted />
          <EmojiReactionButton emoji="🚀" initialCount={5} />
        </div>
      );
    case "DropZone":
      return <DropZoneCard />;
    case "RichTextEditor":
      return <RichTextEditorCard />;
    case "AppLayout":
      return <AppLayoutPreview mode="layout" />;
    case "Navbar":
      return <AppLayoutPreview mode="navbar" />;
    case "Sidebar":
      return (
        <div className="w-full max-w-[220px] space-y-1 rounded-xl border border-border bg-surface p-2">
          <SidebarNavItem label="Introduction" isActive />
          <SidebarNavItem label="Components" badge={85} />
        </div>
      );
    case "DataGrid":
      return <DataGridPreview />;
    case "KPI":
      return <KpiCard />;
    case "AreaChart":
      return <MiniAreaChart />;
    case "BarChart":
      return <MiniBarChart />;
    case "ChartTooltip":
      return (
        <ChartTooltip indicator="dot">
          <ChartTooltip.Header>Jul 2026</ChartTooltip.Header>
          <ChartTooltip.Item>
            <ChartTooltip.Indicator color="var(--accent)" />
            <ChartTooltip.Label>Revenue</ChartTooltip.Label>
            <ChartTooltip.Value>$7,800</ChartTooltip.Value>
          </ChartTooltip.Item>
        </ChartTooltip>
      );
    case "ComposedChart":
      return (
        <ComposedChart
          data={[
            { m: "Jan", a: 40, b: 28 },
            { m: "Feb", a: 62, b: 45 },
            { m: "Mar", a: 54, b: 50 },
          ]}
          height={96}
          className="max-w-[220px]"
        >
          <ComposedChart.Bar dataKey="a" name="Sales" barSize={16} />
          <ComposedChart.Line dataKey="b" name="Target" />
          <ComposedChart.Tooltip />
        </ComposedChart>
      );
    case "LineChart":
      return (
        <LineChart
          data={[
            { m: "Jan", v: 30 },
            { m: "Feb", v: 55 },
            { m: "Mar", v: 42 },
            { m: "Apr", v: 78 },
          ]}
          height={96}
          className="max-w-[220px]"
        >
          <LineChart.Line dataKey="v" name="Trend" dot={{ r: 2.5 }} />
          <LineChart.Tooltip />
        </LineChart>
      );
    case "PieChart":
      return (
        <PieChart height={100} className="max-w-[160px]">
          <PieChart.Pie
            data={[
              { name: "Web", value: 60 },
              { name: "App", value: 40 },
            ]}
            dataKey="value"
            innerRadius={24}
            outerRadius={40}
            paddingAngle={4}
          >
            <PieChart.Cell fill="var(--accent)" />
            <PieChart.Cell fill="var(--success)" />
          </PieChart.Pie>
          <PieChart.Tooltip />
        </PieChart>
      );
    case "RadarChart":
      return (
        <RadarChart
          data={[
            { skill: "Design", v: 80 },
            { skill: "UI", v: 92 },
            { skill: "API", v: 75 },
            { skill: "Test", v: 84 },
            { skill: "Ops", v: 68 },
          ]}
          height={108}
          outerRadius="68%"
          className="max-w-[200px]"
        >
          <RadarChart.Grid />
          <RadarChart.AngleAxis dataKey="skill" />
          <RadarChart.Radar dataKey="v" name="Score" />
          <RadarChart.Tooltip />
        </RadarChart>
      );
    case "RadialChart":
      return (
        <RadialChart
          data={[
            { name: "Speed", value: 85, fill: "var(--accent)" },
            { name: "A11y", value: 94, fill: "var(--success)" },
          ]}
          height={100}
          barSize={8}
          className="max-w-[160px]"
        >
          <RadialChart.AngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialChart.Bar dataKey="value" />
          <RadialChart.Tooltip />
        </RadialChart>
      );
    case "PromptInput":
      return <PromptInputBox />;
    case "ChatMessage":
      return <ChatMessageBubble />;
    default:
      return null;
  }
}

function renderFreePreview(name: string) {
  switch (name) {
    // Buttons
    case "Button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm" variant="primary">
            Primary
          </Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
          <Button size="sm" variant="danger-soft">
            Danger
          </Button>
        </div>
      );
    case "ButtonGroup":
      return (
        <ButtonGroup>
          <Button size="sm" variant="secondary">
            Left
          </Button>
          <Button size="sm" variant="secondary">
            Center
          </Button>
          <Button size="sm" variant="secondary">
            Right
          </Button>
        </ButtonGroup>
      );
    case "CloseButton":
      return <CloseButton aria-label="Close preview" />;
    case "ToggleButton":
      return (
        <ToggleButton size="sm" defaultSelected>
          Toggle
        </ToggleButton>
      );
    case "ToggleButtonGroup":
      return (
        <ToggleButtonGroup defaultSelectedKeys={["left"]}>
          <ToggleButton id="left" size="sm">
            B
          </ToggleButton>
          <ToggleButton id="center" size="sm">
            I
          </ToggleButton>
          <ToggleButton id="right" size="sm">
            U
          </ToggleButton>
        </ToggleButtonGroup>
      );

    // Forms
    case "Checkbox":
      return (
        <Checkbox defaultSelected>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>Accept terms</Checkbox.Content>
        </Checkbox>
      );
    case "CheckboxGroup":
      return (
        <CheckboxGroup defaultValue={["react"]} className="flex flex-row gap-3">
          <Checkbox value="react">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>React</Checkbox.Content>
          </Checkbox>
          <Checkbox value="tw">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>Tailwind</Checkbox.Content>
          </Checkbox>
        </CheckboxGroup>
      );
    case "Description":
      return <Description>Helper description text for a field.</Description>;
    case "ErrorMessage":
      return <ErrorMessage>Invalid input value.</ErrorMessage>;
    case "FieldError":
      return (
        <TextField isInvalid className="w-full max-w-[220px]">
          <Input defaultValue="bad@" aria-label="Email" />
          <FieldError>Email tidak valid</FieldError>
        </TextField>
      );
    case "Fieldset":
      return (
        <Fieldset className="w-full max-w-[220px]">
          <Label>Profile</Label>
          <Input placeholder="Nama lengkap" aria-label="Nama lengkap" />
        </Fieldset>
      );
    case "Form":
      return (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Form submitted!");
          }}
          className="flex w-full max-w-[230px] items-center gap-2"
        >
          <Input placeholder="Email..." aria-label="Email" className="flex-1" />
          <Button type="submit" size="sm">
            Go
          </Button>
        </Form>
      );
    case "Input":
      return <Input placeholder="Type here..." aria-label="Input preview" className="max-w-[220px]" />;
    case "InputGroup":
      return (
        <InputGroup className="max-w-[220px]">
          <InputGroup.Prefix>
            <Mail className="h-3.5 w-3.5 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="you@heroui.com" aria-label="Email" />
        </InputGroup>
      );
    case "InputOTP":
      return (
        <InputOTP maxLength={4} aria-label="OTP">
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
          </InputOTP.Group>
        </InputOTP>
      );
    case "Label":
      return <Label>Accessible Form Label</Label>;
    case "NumberField":
      return (
        <NumberField defaultValue={12} aria-label="Quantity" className="max-w-[180px]">
          <NumberField.Group>
            <NumberField.DecrementButton />
            <NumberField.Input />
            <NumberField.IncrementButton />
          </NumberField.Group>
        </NumberField>
      );
    case "RadioGroup":
      return (
        <RadioGroup defaultValue="a" orientation="horizontal" aria-label="Options">
          <Radio value="a">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>Option A</Radio.Content>
          </Radio>
          <Radio value="b">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>Option B</Radio.Content>
          </Radio>
        </RadioGroup>
      );
    case "SearchField":
      return (
        <SearchField aria-label="Search" className="max-w-[220px]">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      );
    case "TextArea":
      return (
        <TextArea
          rows={2}
          placeholder="Write a message..."
          aria-label="TextArea preview"
          className="max-w-[220px]"
        />
      );
    case "TextField":
      return (
        <TextField className="w-full max-w-[220px]">
          <Label>Username</Label>
          <Input placeholder="@heroui" />
        </TextField>
      );

    // Date and Time
    case "Calendar":
      return (
        <Calendar aria-label="Calendar preview" className="scale-90">
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.Heading />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
      );
    case "RangeCalendar":
      return (
        <RangeCalendar aria-label="RangeCalendar preview" className="scale-90">
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.Heading />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>
      );
    case "DateField":
      return (
        <DateField aria-label="DateField preview" className="w-full max-w-[210px]">
          <Label>Tanggal</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>
      );
    case "TimeField":
      return (
        <TimeField aria-label="TimeField preview" className="w-full max-w-[180px]">
          <Label>Waktu</Label>
          <TimeField.Group>
            <TimeField.Input>
              {(segment) => <TimeField.Segment segment={segment} />}
            </TimeField.Input>
          </TimeField.Group>
        </TimeField>
      );
    case "DatePicker":
      return (
        <DatePicker aria-label="DatePicker preview" className="w-full max-w-[220px]">
          <Label>Pilih Tanggal</Label>
          <DateField.Group fullWidth>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="DatePicker calendar">
              <Calendar.Header>
                <Calendar.NavButton slot="previous" />
                <Calendar.Heading />
                <Calendar.NavButton slot="next" />
              </Calendar.Header>
              <Calendar.Grid>
                <Calendar.GridHeader>
                  {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>
                <Calendar.GridBody>
                  {(date) => <Calendar.Cell date={date} />}
                </Calendar.GridBody>
              </Calendar.Grid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>
      );
    case "DateRangePicker":
      return (
        <DateRangePicker aria-label="DateRangePicker preview" className="w-full max-w-[240px]">
          <Label>Rentang Tanggal</Label>
          <DateField.Group fullWidth>
            <DateField.Input slot="start">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator />
            <DateField.Input slot="end">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DateRangePicker.Popover>
            <RangeCalendar aria-label="DateRangePicker calendar">
              <RangeCalendar.Header>
                <RangeCalendar.NavButton slot="previous" />
                <RangeCalendar.Heading />
                <RangeCalendar.NavButton slot="next" />
              </RangeCalendar.Header>
              <RangeCalendar.Grid>
                <RangeCalendar.GridHeader>
                  {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                </RangeCalendar.GridHeader>
                <RangeCalendar.GridBody>
                  {(date) => <RangeCalendar.Cell date={date} />}
                </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
            </RangeCalendar>
          </DateRangePicker.Popover>
        </DateRangePicker>
      );

    // Navigation
    case "Accordion":
      return (
        <Accordion className="w-full max-w-[240px]">
          <Accordion.Item id="1">
            <Accordion.Heading>
              <Accordion.Trigger className="py-1.5 text-xs">
                Accordion Item
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="text-xs">Panel content</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      );
    case "Breadcrumbs":
      return (
        <Breadcrumbs className="text-xs">
          <Breadcrumbs.Item href="#catalog">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#catalog">UI</Breadcrumbs.Item>
          <Breadcrumbs.Item>Atoms</Breadcrumbs.Item>
        </Breadcrumbs>
      );
    case "Disclosure":
    case "DisclosureGroup":
      return (
        <Disclosure className="w-full max-w-[220px]">
          <Disclosure.Heading>
            <Disclosure.Trigger className="text-xs font-medium">
              Toggle details
            </Disclosure.Trigger>
          </Disclosure.Heading>
          <Disclosure.Content>
            <Disclosure.Body>
              <p className="pt-1 text-xs text-muted">Hidden content revealed.</p>
            </Disclosure.Body>
          </Disclosure.Content>
        </Disclosure>
      );
    case "Link":
      return (
        <Link href="#catalog" className="text-sm font-medium">
          HeroUI Link
        </Link>
      );
    case "Pagination":
      return (
        <Pagination size="sm">
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous>
                <Pagination.PreviousIcon />
              </Pagination.Previous>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Link isActive>1</Pagination.Link>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Link>2</Pagination.Link>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Next>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      );
    case "Tabs":
      return (
        <Tabs defaultSelectedKey="one">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Preview tabs">
              <Tabs.Tab id="one" className="text-xs">
                Overview
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="two" className="text-xs">
                API
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
      );

    // Overlays
    case "Popover":
      return (
        <Popover>
          <Button size="sm" variant="secondary">
            Open Popover
          </Button>
          <Popover.Content className="p-3 text-xs">
            Popover content!
          </Popover.Content>
        </Popover>
      );
    case "Toast":
      return (
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.success("Toast triggered!", {
              description: "HeroUI v3 Toast preview.",
            })
          }
        >
          Show Toast
        </Button>
      );
    case "Tooltip":
      return (
        <Tooltip>
          <Tooltip.Trigger>
            <Button size="sm" variant="secondary">
              Hover me
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip info</Tooltip.Content>
        </Tooltip>
      );
    case "Modal":
      return (
        <Modal>
          <Modal.Trigger>
            <Button size="sm" variant="secondary">
              Open Modal
            </Button>
          </Modal.Trigger>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Preview Modal</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p className="text-sm text-muted">
                    Ini adalah Modal Organism asli dari @heroui/react.
                  </p>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      );
    case "AlertDialog":
      return (
        <AlertDialog>
          <AlertDialog.Trigger>
            <Button size="sm" variant="danger-soft">
              Delete Item
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog>
                <AlertDialog.Header>
                  <AlertDialog.Heading>Konfirmasi Hapus</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p className="text-sm text-muted">
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="secondary" size="sm">
                    Batal
                  </Button>
                  <Button slot="close" variant="danger" size="sm">
                    Hapus
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      );
    case "Drawer":
    case "Sheet":
      return (
        <Drawer>
          <Drawer.Trigger>
            <Button size="sm" variant="secondary">
              Open {name}
            </Button>
          </Drawer.Trigger>
          <Drawer.Backdrop>
            <Drawer.Content placement="right">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Header>
                  <Drawer.Heading>{name} Preview</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>
                  <p className="text-sm text-muted">
                    Slide-out panel dari @heroui/react.
                  </p>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      );

    // Collections
    case "Dropdown":
      return (
        <Dropdown>
          <Button size="sm" variant="secondary">
            Menu
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item id="edit">Edit</Dropdown.Item>
              <Dropdown.Item id="copy">Duplicate</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      );
    case "ListBox":
      return (
        <ListBox
          aria-label="Preview ListBox"
          selectionMode="single"
          defaultSelectedKeys={["a"]}
          className="w-full max-w-[200px] rounded-lg bg-surface p-1 text-xs"
        >
          <ListBox.Item id="a" textValue="Item One">
            Item One
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="b" textValue="Item Two">
            Item Two
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      );
    case "TagGroup":
      return (
        <TagGroup aria-label="Tags">
          <TagGroup.List>
            <Tag id="react">React</Tag>
            <Tag id="v3">HeroUI v3</Tag>
            <Tag id="tw">Tailwind</Tag>
          </TagGroup.List>
        </TagGroup>
      );

    // Controls
    case "Slider":
      return (
        <Slider defaultValue={60} aria-label="Slider preview" className="w-full max-w-[200px]">
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
      );
    case "Switch":
      return (
        <Switch defaultSelected>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Content>Enabled</Switch.Content>
        </Switch>
      );

    // Feedback
    case "Alert":
      return (
        <Alert status="accent" className="w-full py-2">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title className="text-xs">Info Alert</Alert.Title>
          </Alert.Content>
        </Alert>
      );
    case "Meter":
      return (
        <Meter value={72} aria-label="Storage" className="w-full max-w-[200px]">
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
      );
    case "ProgressBar":
      return (
        <ProgressBar value={65} aria-label="Progress" className="w-full max-w-[200px]">
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      );
    case "ProgressCircle":
      return (
        <ProgressCircle value={75} aria-label="Circular progress">
          <ProgressCircle.Track>
            <ProgressCircle.TrackCircle />
            <ProgressCircle.FillCircle />
          </ProgressCircle.Track>
        </ProgressCircle>
      );
    case "Skeleton":
      return (
        <div className="flex w-full max-w-[200px] items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-3/4 rounded" />
            <Skeleton className="h-2.5 w-1/2 rounded" />
          </div>
        </div>
      );
    case "Spinner":
      return <Spinner size="md" />;

    // Layout
    case "Card":
      return (
        <Card className="w-full max-w-[210px] p-2.5">
          <Card.Title className="text-xs">Mini Card</Card.Title>
          <Card.Description className="text-[11px]">Surface container</Card.Description>
        </Card>
      );
    case "Separator":
      return (
        <div className="flex w-full max-w-[200px] items-center gap-2 text-xs text-muted">
          <span>Left</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Right</span>
        </div>
      );
    case "Surface":
      return (
        <Surface className="rounded-lg px-4 py-2 text-xs shadow-xs">
          Elevated Surface
        </Surface>
      );
    case "Toolbar":
      return (
        <Toolbar aria-label="Preview toolbar" className="gap-1.5">
          <Button size="sm" variant="secondary">
            Cut
          </Button>
          <Button size="sm" variant="secondary">
            Copy
          </Button>
          <Button size="sm" variant="secondary">
            Paste
          </Button>
        </Toolbar>
      );

    // Media
    case "Avatar":
      return (
        <div className="flex items-center gap-2.5">
          <Avatar size="sm">
            <Avatar.Image
              alt="John Doe"
              src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
            />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <Avatar size="md" color="accent">
            <Avatar.Fallback>AC</Avatar.Fallback>
          </Avatar>
          <Avatar size="md" color="success" variant="soft">
            <Avatar.Fallback>SC</Avatar.Fallback>
          </Avatar>
        </div>
      );
    case "AvatarGroup":
      return (
        <AvatarGroup max={3} size="sm">
          <Avatar>
            <Avatar.Image
              alt="John Doe"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Image
              alt="Kate Wilson"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
            />
            <Avatar.Fallback>KW</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Image
              alt="Emily Chen"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
            />
            <Avatar.Fallback>EC</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Image
              alt="Michael Brown"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
            />
            <Avatar.Fallback>MB</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      );

    // Pickers
    case "ComboBox":
    case "Autocomplete":
      return (
        <ComboBox className="w-full max-w-[210px]" aria-label={name}>
          <ComboBox.InputGroup>
            <Input placeholder={`Cari ${name}...`} />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              <ListBox.Item id="1" textValue="React">
                React
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="2" textValue="Tailwind">
                Tailwind
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </ComboBox.Popover>
        </ComboBox>
      );
    case "Select":
      return (
        <Select placeholder="Pilih item..." className="w-full max-w-[200px]" aria-label={name}>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="1" textValue="React">
                React
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="2" textValue="Tailwind">
                Tailwind
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      );

    // Typography
    case "Kbd":
      return (
        <div className="flex items-center gap-1.5 text-xs">
          <Kbd>⌘</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </div>
      );
    case "Typography":
      return (
        <div className="text-center">
          <p className="text-sm font-semibold">Heading Text</p>
          <p className="text-xs text-muted">Muted body copy</p>
        </div>
      );

    // Data Display
    case "Badge":
      return (
        <div className="flex items-center gap-4">
          <Badge.Anchor>
            <Avatar size="md">
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <Badge color="danger" size="sm">
              5
            </Badge>
          </Badge.Anchor>
          <Badge.Anchor>
            <Avatar size="md">
              <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar>
            <Badge color="accent" size="sm">
              New
            </Badge>
          </Badge.Anchor>
          <Badge.Anchor>
            <Avatar size="md">
              <Avatar.Fallback>CD</Avatar.Fallback>
            </Avatar>
            <Badge color="success" placement="bottom-right" size="sm" />
          </Badge.Anchor>
        </div>
      );
    case "Chip":
      return (
        <div className="flex gap-1.5">
          <Chip color="accent" variant="soft" size="sm">
            <Chip.Label>Accent</Chip.Label>
          </Chip>
          <Chip color="success" variant="soft" size="sm">
            <Chip.Label>Success</Chip.Label>
          </Chip>
        </div>
      );
    case "Table":
      return (
        <Table className="w-full max-w-[230px]">
          <Table.Content aria-label="Mini table">
            <Table.Header>
              <Table.Column isRowHeader className="text-[11px]">
                Name
              </Table.Column>
              <Table.Column className="text-[11px]">Role</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row id="1">
                <Table.Cell className="text-xs">HeroUI</Table.Cell>
                <Table.Cell className="text-xs">v3</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Content>
        </Table>
      );

    // Colors
    case "ColorArea":
      return (
        <ColorArea defaultValue="hsb(217, 100%, 93%)" className="h-24 w-36">
          <ColorArea.Thumb />
        </ColorArea>
      );
    case "ColorField":
      return (
        <ColorField defaultValue="#006FEE" aria-label="ColorField" className="w-full max-w-[180px]">
          <Label>Hex Color</Label>
          <ColorField.Group>
            <ColorField.Input />
          </ColorField.Group>
        </ColorField>
      );
    case "ColorPicker":
      return (
        <ColorPicker defaultValue="#006FEE">
          <ColorPicker.Trigger>
            <ColorSwatch size="sm" />
            <span className="text-xs font-medium">Pick Color</span>
          </ColorPicker.Trigger>
          <ColorPicker.Popover className="space-y-2 p-3">
            <ColorArea className="h-28 w-44">
              <ColorArea.Thumb />
            </ColorArea>
            <ColorSlider channel="hue">
              <ColorSlider.Track>
                <ColorSlider.Thumb />
              </ColorSlider.Track>
            </ColorSlider>
          </ColorPicker.Popover>
        </ColorPicker>
      );
    case "ColorSlider":
      return (
        <ColorSlider channel="hue" defaultValue="hsl(210, 100%, 50%)" className="w-full max-w-[200px]">
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      );
    case "ColorSwatch":
      return (
        <div className="flex gap-2">
          <ColorSwatch color="#006FEE" />
          <ColorSwatch color="#17C964" />
          <ColorSwatch color="#F5A524" />
        </div>
      );
    case "ColorSwatchPicker":
      return (
        <ColorSwatchPicker defaultValue="#006FEE">
          <ColorSwatchPicker.Item color="#006FEE">
            <ColorSwatchPicker.Swatch />
          </ColorSwatchPicker.Item>
          <ColorSwatchPicker.Item color="#17C964">
            <ColorSwatchPicker.Swatch />
          </ColorSwatchPicker.Item>
          <ColorSwatchPicker.Item color="#F31260">
            <ColorSwatchPicker.Swatch />
          </ColorSwatchPicker.Item>
        </ColorSwatchPicker>
      );

    // Utilities
    case "ScrollShadow":
      return (
        <ScrollShadow className="h-16 w-full max-w-[210px] rounded-lg bg-surface p-2 text-xs">
          <p>Scrollable content line 1</p>
          <p>Scrollable content line 2</p>
          <p>Scrollable content line 3</p>
          <p>Scrollable content line 4</p>
        </ScrollShadow>
      );

    default:
      return (
        <Chip variant="soft" color="accent" size="sm">
          <Sparkles className="mr-1 h-3 w-3" />
          <Chip.Label>{name}</Chip.Label>
        </Chip>
      );
  }
}
