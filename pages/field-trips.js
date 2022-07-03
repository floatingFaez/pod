import Container from "@components/container";
import Layout from "@components/layout";
import { configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import GetImage from "@utils/getImage";
import Subpagehero from "@components/sections/subpagehero";
import Image from "next/image";
import Link from "next/link";
// import BannerImage from "/public/img/pages/field-trips-banner.webp";


export default function FieldTrips({ siteconfig }) {
  return (
    <Layout {...siteconfig}>
      <Container py="0">
        <Subpagehero title="Seasonal Storytelling" subtitle="Field Trips"/>

        <div className="banner">
            <Image
                src={`/img/pages/field-trips-banner.webp`}
                alt={"Thumbnail"}
                layout="fill"
                objectFit="cover"
            />
        </div>

        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          <p>
            We provide real-time connectivity to enable software
            providers and financial institutions to build integrated
            products for their small business customers.
          </p>
          <p>
            Our API infrastructure is leveraged by clients ranging
            from lenders to corporate card providers and business
            forecasting tools, with use cases including automatic
            reconciliation, business dashboarding, and loan
            decisioning.
          </p>
          <p>
            <Link href="/contact">Get in touch</Link>
          </p>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const config = await getClient(preview).fetch(configQuery);
  return {
    props: {
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
