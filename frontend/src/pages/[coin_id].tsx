import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const CoinPage: NextPage = ({}) => {
  const router = useRouter();
  const coin_id = router.query.coin_id as string;

  return (
    <Layout>
      <Button variant="link" onClick={() => router.back()}>
        back
      </Button>
    </Layout>
  );
};

export default CoinPage;
