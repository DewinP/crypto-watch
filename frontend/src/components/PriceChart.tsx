import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { useGetCoinPriceHistoryQuery } from "../app/services/cryptoApi";

type DateRange = "1" | "7" | "30" | "90" | "180" | "365" | "max";

const PriceChart: React.FC<{ coinId: string }> = ({ coinId }) => {
  const [dateRange, setDateRange] = useState<DateRange>("1");
  const { data, isLoading: isLoadingPriceHistory } =
    useGetCoinPriceHistoryQuery(
      { coin_id: coinId, range: dateRange },
      { skip: !coinId }
    );
  const prices = data?.prices.map(([date, price]) => ({
    date: date,
    price: price,
  }));

  const dateFormatter = (date: Date) => {
    if (dateRange === "max") {
      return moment(date).format("M/D/YYYY");
    } else if (dateRange === "1") {
      return moment(date).format("h:mm a");
    } else if (dateRange === "7") {
      return moment(date).format("Do");
    } else {
      return moment(date).format("Do/MMM");
    }
  };

  const isNegative =
    prices &&
    prices.length > 0 &&
    prices[0].price < prices[prices.length - 1].price;

  const handleButtonClick = (range: DateRange) => {
    setDateRange(range);
  };

  if (isLoadingPriceHistory || !data) {
    return <>loading...</>;
  }

  return (
    <Stack>
      <Flex justifyContent="end">
        <ButtonGroup size="xs" alignSelf="end">
          <Button
            onClick={() => handleButtonClick("1")}
            isActive={dateRange === "1"}
          >
            1D
          </Button>
          <Button
            onClick={() => handleButtonClick("7")}
            isActive={dateRange === "7"}
          >
            7D
          </Button>
          <Button
            onClick={() => handleButtonClick("30")}
            isActive={dateRange === "30"}
          >
            1M
          </Button>
          <Button
            onClick={() => handleButtonClick("90")}
            isActive={dateRange === "90"}
          >
            3M
          </Button>
          <Button
            onClick={() => handleButtonClick("180")}
            isActive={dateRange === "180"}
          >
            6M
          </Button>
          <Button
            onClick={() => handleButtonClick("365")}
            isActive={dateRange === "365"}
          >
            1Y
          </Button>
          <Button
            onClick={() => handleButtonClick("max")}
            isActive={dateRange === "max"}
          >
            ALL
          </Button>
        </ButtonGroup>
      </Flex>
      <Skeleton isLoaded={!isLoadingPriceHistory}>
        <Box
          width="100%"
          borderRadius={4}
          height="300px"
          backgroundColor="gray.50"
        >
          <ResponsiveContainer>
            <AreaChart data={prices}>
              <YAxis
                dataKey="price"
                domain={["dataMin", "dataMax"]}
                fontSize={11}
                fontWeight="bold"
                tickFormatter={(value) =>
                  value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }
              />
              <XAxis
                dataKey="date"
                scale="time"
                fontSize={11}
                fontWeight="bold"
                tickFormatter={dateFormatter}
                domain={["dataMin", "dataMax"]}
              />
              <Tooltip content={<CustomTooltip />} />

              <Area
                stroke="white"
                fill={isNegative ? "green" : "red"}
                type="monotone"
                dataKey="price"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Skeleton>
    </Stack>
  );
};

export default PriceChart;

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <Stack bgColor="white" padding={1} borderRadius={2} boxShadow="lg">
        <Flex justifyContent={"end"}>
          <Text fontSize={11} fontWeight="bold">
            {moment(payload[0].payload.date).format("MMM Do, YYYY h:mm a")}
          </Text>
        </Flex>
        <Text fontWeight="semibold" color="#3182CE">
          <Text color="gray.500" as="span" mr={1}>
            Price:
          </Text>
          {`${payload?.[0].value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`}
        </Text>
      </Stack>
    );
  }

  return null;
};
