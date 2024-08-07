import {
  InlineLayout,
  Link,
  Text,
  View,
  useBuyerJourneySteps,
  useBuyerJourneyActiveStep,
  useShop,
  useTranslate,
  Style,
} from "@shopify/ui-extensions-react/checkout";

export default function Extension() {
  const steps = useBuyerJourneySteps();
  const activeStep = useBuyerJourneyActiveStep();
  const { storefrontUrl } = useShop();
  const translate = useTranslate();

  const assembledSteps = [...steps];

  const activeStepIndex = assembledSteps.findIndex(
    ({ handle }) => handle === activeStep?.handle
  );

  return (
    <InlineLayout
      accessibilityRole="orderedList"
      spacing="none"
      maxInlineSize="fill"
      inlineAlignment={"center"}
      blockAlignment={"center"}
      padding="none"
      columns={"auto"}
      display={Style.default("none").when(
        { viewportInlineSize: { min: "small" } },
        "auto"
      )}
    >
      {assembledSteps.map(({ label, handle, to }, index) => (
        <>
          <View
            inlineAlignment="center"
            minInlineSize="100%"
            padding="extraTight"
          >
            {index < activeStepIndex ? (
              <Text size="small">
                {" "}
                <Link to={to}>{label}</Link>
              </Text>
            ) : (
              <Text
                size="small"
                emphasis={activeStep?.handle === handle ? "bold" : undefined}
                appearance={
                  activeStep?.handle !== handle ? "subdued" : undefined
                }
              >
                {label}
              </Text>
            )}
          </View>
          {index < assembledSteps.length - 1 ? (
            <Text size="small"> {">"} </Text>
          ) : null}
        </>
      ))}
    </InlineLayout>
  );
}
