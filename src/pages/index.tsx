import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

// Tres tipos de chamadas
// (SSG) Static-side-generation = informacoes que estao disponiveis para todos
// (SSR) Server-side-rendering = dados dinamicos da sessão do usuario
// (CSR) Client-side = dados dinamicos de baixa prioridade

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey Welcome</span>
          <h1>
            Newa about the <span>React</span> world.
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KhA1aCcwmlFIx3ExJLpgAbQ");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount! / 100),
  };

  return {
    props: {
      nome: "Peve",
      product,
    },
    revalidate: 60 * 60 * 24, //24 Horas
  };
};
