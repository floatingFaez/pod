import Container from "@components/container";
import Layout from "@components/layout";
import { configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import GetImage from "@utils/getImage";
import Subpagehero from "@components/sections/subpagehero";
import Tabs from "@components/tabs";
import Button from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import BannerImage from "/public/img/pages/field-trips-banner.webp";

export default function FieldTrips({ siteconfig }) {
  return (
    <Layout {...siteconfig}>
      <Container py="0">
        <Subpagehero title="Seasonal Storytelling" subtitle="Field Trips"/>

        {/* <div className="banner">
            <Image
                src={`/img/pages/field-trips-banner.webp`}
                alt={"Thumbnail"}
                layout="fill"
                objectFit="cover"
            />
        </div> */}

        <div className="mx-auto prose text-center dark:prose-invert section-desc">
          <p className="text-desc dark:text-white">
            We plan for all-round seasonal storytelling and host field trips to destinations for sophisticated narration. 
            Our bespoke packages are inclusive of all preproduction and post-production services. You elect preferred talent and concepts are exclusive, 
            served on a first in, best dressed basis.
          </p>
        </div>

        <Subpagehero title="Personalised Packages" subtitle="Bespoke Packages" classes="border-t border-gray-400"/>

        <Tabs />

        <div className={`py-5 border-b border-t border-gray-400 text-center`}>
            <p className="mt-2 text-lg text-white uppercase">Submit Custom Package</p>
        </div>

        <div className="grid grid-cols-2 text-white">
            <div className="py-8 text-center">
                <p className="text-3xl mb-5">Discover Call</p>
                <p className="mb-16 max-w-lg mx-auto">Pellentesque sed luctus nisi. Vestibulum sed massa eu velit egestas ultricies. Nulla semper justo tristique mi eleifend, 
                  eu ultrices urna. Pellentesque sed luctus nisi. </p>

                  <Button text="Book Your Call" />
            </div>
            <div className="py-8 text-center">
                <p className="text-3xl mb-5">Dreamer Rewards</p>

                <p className="mb-16 max-w-lg mx-auto">Pellentesque sed luctus nisi. Vestibulum sed massa eu velit egestas ultricies. Nulla semper justo tristique mi eleifend, 
                  eu ultrices urna. Pellentesque sed luctus nisi. </p>

                  <Button text="Learn more" />

            </div>
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
