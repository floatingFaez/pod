import { useState, useEffect } from 'react'
import Image from "next/image";
import dynamic from 'next/dynamic'
import Link from "next/link";
import { useRouter } from "next/router";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import Layout from "@components/layout";
import Container from "@components/container";
import SliderPlaceHolder from "@components/ui/slider-placeholder";
const WorkSlider = dynamic(() => import('@components/work/workSlider'),{ loading: () => <SliderPlaceHolder sizes={{w:1130,h:785}}/>, ssr: false });
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";

import ErrorPage from "next/error";
import GetImage from "@utils/getImage";
import { NextSeo } from "next-seo";

import { singleWorkquery, configQuery, workPathQuery } from "@lib/groq";
import { map } from "lodash";


export default function Post(props) {

  const { postdata, siteconfig, preview } = props;

  const [modalShow, setModalShow] = useState(false)
  // const [player, setPlayer] = useState(null)

  const onPlayerReady = () => {
    console.log("iframe Added")
  }

  // const pauseVid = () => player.pauseVideo()


  const router = useRouter();
  const { slug } = router.query;

  const { data: post } = usePreviewSubscription(singleWorkquery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const handleModalClose = () => {
    // pauseVid()
    setModalShow(false)
  }
  
  // const ogimage = siteConfig?.openGraphImage
  //   ? GetImage(siteConfig?.openGraphImage).src
  //   : defaultOG.src;
  
  let imageProps = post?.mainImage ? GetImage(post?.mainImage) : null;

  return (
    <>
      {post && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${post.title} - ${siteConfig.title}`}
            description={post.excerpt || ""}
            canonical={`${siteConfig?.url}/post/${post.slug.current}`}
            openGraph={{
              url: `${siteConfig?.url}/post/${post.slug.current}`,
              title: `${post.title} - ${siteConfig.title}`,
              description: post.excerpt || "",
              images: [
                {
                  url: imageProps.src,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: siteConfig.title
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          
          <div className="h-screen relative full-width relative z-0 overflow-hidden -mt-14">
            <div className="aspect-video">
              {imageProps && (
                <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={post.mainImage?.alt || "Thumbnail"}
                  placeholder="blur"
                  layout="fill"
                  loading="eager"
                  objectFit="cover"
                  objectPosition="top"
                />
              )}
            </div>

            <div className="slider-content full-width w-full h-screen text-white">

              <div className="mx-auto px-5 max-w-screen-xl h-full flex flex-row md:flex-col flex-grow justify-between ">
                <Link href="/work">
                  <a className="fss text-white uppercase back-to-index justify-end index-nav">
                    Back to Index
                  </a>
                </Link>

                <div className="description flex flex-row justify-end md:justify-between fss-2">

                  <div className="body hidden md:block">
                    <p className="mb-3 fss-3">{post?.campaign_name}</p>
                    <div className="post-body">{post.body && <PortableText value={post.body} />}</div>
                  </div>

                  <div className="social-share grid content-end">
                    <div className="share-content flex content-end">
                      <span className="uppercase">Share</span>
                      <ul className="flex">
                        <li className="ml-4">
                          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.287315 10.1196H2.24106V18.6935C2.24106 18.7748 2.27133 18.8528 2.32521 18.9102C2.37909 18.9677 2.45217 19 2.52837 19H5.83824C5.91444 19 5.98752 18.9677 6.0414 18.9102C6.09528 18.8528 6.12555 18.7748 6.12555 18.6935V10.1595H8.37006C8.44082 10.16 8.50927 10.1326 8.56229 10.0826C8.61531 10.0327 8.64916 9.96355 8.65737 9.88858L8.99813 6.73152C9.00276 6.68844 8.99877 6.6448 8.98643 6.60349C8.97408 6.56218 8.95365 6.52413 8.92649 6.49186C8.89934 6.4596 8.86607 6.43384 8.82889 6.41631C8.79171 6.39877 8.75146 6.38985 8.71081 6.39013H6.12498V4.4129C6.12498 3.81655 6.42608 3.51377 7.02025 3.51377H8.71139C8.78759 3.51377 8.86067 3.48149 8.91455 3.42402C8.96843 3.36655 8.9987 3.2886 8.9987 3.20732V0.306452C8.9987 0.225176 8.96843 0.147228 8.91455 0.0897576C8.86067 0.0322868 8.78759 0 8.71139 0L6.38126 0C6.36517 0 6.3284 0 6.27496 0C5.87272 0 4.46545 0.0845806 3.35526 1.17371C2.12556 2.38052 2.29622 3.82574 2.33759 4.07642V6.39013H0.287315C0.211114 6.39013 0.138035 6.42242 0.0841528 6.47989C0.0302708 6.53736 0 6.6153 0 6.69658V9.81319C0 9.85344 0.00743192 9.89329 0.0218708 9.93047C0.0363098 9.96765 0.0574731 10.0014 0.0841528 10.0299C0.110832 10.0583 0.142506 10.0809 0.177364 10.0963C0.212223 10.1117 0.249584 10.1196 0.287315 10.1196Z" fill="white"/>
                          </svg>
                        </li>
                        <li className="ml-4">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 0C6.555 0 6.2475 0 5.2875 0.0525C4.54152 0.0684086 3.80361 0.210413 3.105 0.4725C2.50548 0.701016 1.96103 1.05367 1.50735 1.50735C1.05367 1.96103 0.701016 2.50548 0.4725 3.105C0.210413 3.80361 0.0684086 4.54152 0.0525 5.2875C0 6.2475 0 6.555 0 9C0 11.445 0 11.7525 0.0525 12.75C0.0675393 13.4961 0.209571 14.2341 0.4725 14.9325C0.701016 15.532 1.05367 16.0765 1.50735 16.5301C1.96103 16.9838 2.50548 17.3365 3.105 17.565C3.80361 17.8271 4.54152 17.9691 5.2875 17.985C6.2475 18 6.555 18 9 18C11.445 18 11.7525 18 12.7125 17.9475C13.4586 17.9325 14.1966 17.7904 14.895 17.5275C15.4945 17.299 16.039 16.9463 16.4926 16.4926C16.9463 16.039 17.299 15.4945 17.5275 14.895C17.7855 14.2082 17.9274 13.4833 17.9475 12.75C18 11.7525 18 11.445 18 9C18 6.555 18 6.2475 17.9475 5.2875C17.9325 4.54143 17.7904 3.80337 17.5275 3.105C17.299 2.50548 16.9463 1.96103 16.4926 1.50735C16.039 1.05367 15.4945 0.701016 14.895 0.4725C14.2085 0.213713 13.4834 0.0717492 12.75 0.0525C11.7525 0 11.445 0 9 0ZM9 1.62C11.4 1.62 11.6925 1.62 12.6375 1.6725C13.209 1.6803 13.7748 1.78688 14.31 1.9875C14.7017 2.12754 15.0559 2.35595 15.345 2.655C15.6441 2.94414 15.8725 3.2983 16.0125 3.69C16.216 4.22437 16.3226 4.79072 16.3275 5.3625C16.365 6.315 16.38 6.6 16.38 9C16.38 11.4 16.38 11.6925 16.32 12.6375C16.3122 13.209 16.2056 13.7748 16.005 14.31C15.8604 14.7012 15.6297 15.055 15.33 15.345C15.0409 15.6441 14.6867 15.8725 14.295 16.0125C13.7608 16.2168 13.1944 16.3234 12.6225 16.3275C11.67 16.365 11.385 16.38 8.9775 16.38C6.57 16.38 6.285 16.38 5.3325 16.32C4.76101 16.3122 4.19517 16.2056 3.66 16.005C3.26697 15.864 2.91247 15.6328 2.625 15.33C2.31972 15.0446 2.08811 14.6894 1.95 14.295C1.74937 13.7598 1.6428 13.194 1.635 12.6225C1.5975 11.6775 1.59 11.385 1.59 8.9925C1.59 6.6 1.59 6.3 1.635 5.34C1.6428 4.76851 1.74937 4.20267 1.95 3.6675C2.09097 3.27447 2.32217 2.91997 2.625 2.6325C2.91247 2.32967 3.26697 2.09847 3.66 1.9575C4.19355 1.76039 4.75632 1.65392 5.325 1.6425C6.2775 1.6425 6.5625 1.5975 8.9625 1.5975L9 1.62ZM9 4.38C8.08625 4.38 7.19302 4.65096 6.43327 5.15861C5.67351 5.66626 5.08135 6.38781 4.73168 7.232C4.382 8.0762 4.29051 9.00513 4.46877 9.90132C4.64704 10.7975 5.08705 11.6207 5.73317 12.2668C6.37929 12.913 7.20249 13.353 8.09868 13.5312C8.99487 13.7095 9.9238 13.618 10.768 13.2683C11.6122 12.9186 12.3337 12.3265 12.8414 11.5667C13.349 10.807 13.62 9.91375 13.62 9C13.62 7.7747 13.1333 6.59958 12.2668 5.73317C11.4004 4.86675 10.2253 4.38 9 4.38ZM9 12C8.40666 12 7.82664 11.8241 7.33329 11.4944C6.83994 11.1648 6.45542 10.6962 6.22836 10.1481C6.0013 9.59987 5.94189 8.99667 6.05764 8.41473C6.1734 7.83279 6.45912 7.29824 6.87868 6.87868C7.29824 6.45912 7.83279 6.1734 8.41473 6.05764C8.99667 5.94189 9.59987 6.0013 10.1481 6.22836C10.6962 6.45542 11.1648 6.83994 11.4944 7.33329C11.8241 7.82664 12 8.40666 12 9C12 9.79565 11.6839 10.5587 11.1213 11.1213C10.5587 11.6839 9.79565 12 9 12ZM14.8875 4.2C14.886 4.41328 14.8214 4.62134 14.7019 4.79796C14.5823 4.97457 14.4131 5.11183 14.2156 5.19243C14.0182 5.27302 13.8012 5.29334 13.5922 5.25083C13.3832 5.20831 13.1915 5.10486 13.0412 4.95353C12.8909 4.80219 12.7888 4.60975 12.7477 4.40045C12.7067 4.19116 12.7285 3.9744 12.8104 3.77749C12.8924 3.58058 13.0308 3.41235 13.2083 3.294C13.3857 3.17566 13.5942 3.11251 13.8075 3.1125C14.0946 3.11448 14.3693 3.22993 14.5716 3.43366C14.774 3.63739 14.8875 3.91287 14.8875 4.2Z" fill="white"/>
                          </svg>
                        </li>
                      </ul>
                    </div>
                    
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="full-width theme-gray-bg">
            <Container>
              <div className="body md:hidden pt-10">
                <p className="mb-3 fss-3">{post?.campaign_name}</p>
                <div className="work-desc">{post.body && <PortableText value={post.body} />}</div>
              </div>

              <div className="grid md:grid-cols-2 md:grid-rows-1 py-10">
                  {
                    map(post?.section2Images, (sectionImage,index)=> {
                      const classes = index === 1 ? 'pad-max':''
                      return <div className={`img-wrap my-5 md:my-24 ${classes}`}>
                                <Section2Image image={sectionImage.image} sizes={{w:660,h:875}} key={sectionImage._key}/>
                              </div>
                    })
                  }
              </div>
            </Container>
          </div>


          <div className="full-width w-full h-screen text-white overflow-hidden relative hidden md:block">
            <div className="aspect-video">
              {
                post?.section3Image && <MainImage image={post?.section3Image} 
                                        layout="fill" 
                                        loading="eager" 
                                        objectFit="cover" 
                                        objectPosition="top"/>
              }
            </div>
          </div>

          <div className="full-width theme-gray-bg pb-4">
            <Container>
              <div className="work-section-content text-center">
                <p className="fss-1 uppercase font-secondary text-center mb-8">{post.section4Heading} </p>
                <div className="text-heading-2.5x font-regular tracking-tight text-center lg:leading-snug text-brand-primary">
                    {post.section4Description && <PortableText value={post.section4Description} />}
                </div>
              </div>
              <div className="relative work-section-image overflow-hidden">
                {post?.section4Image && <MainImage image={post.section4Image} 
                                        layout="fill" 
                                        loading="eager" 
                                        objectFit="cover" 
                                        objectPosition="top"/>}
              </div>
              
            </Container>
          </div>
          <div className="full-width theme-gray-bg py-10 md:py-32">
              <Container>
                <div className="grid md:grid-cols-2 md:grid-rows-1 gap-10">
                  <div className="relative work-section-image overflow-hidden">
                    {post?.section4Image && <MainImage image={post.section5Image} 
                                            layout="fill" 
                                            loading="eager" 
                                            objectFit="cover" 
                                            objectPosition="top"/>}
                  </div>
                  <div className="section-content grid content-center">
                      <div className="vertical-center md:px-16">
                        <span className="fss-3 uppercase">
                          {post?.section5Heading}
                        </span>
                        <div className="fss-2 mt-4">
                          {post?.section5Description && <PortableText value={post.section5Description} />}
                        </div>
                      </div>
                  </div>
                </div>
              </Container>
            </div>

            <div className="full-width  pb-4">

              <Container>
                <div className="work-section-content text-center text-white">
                  <p className="fss-1 uppercase font-secondary text-center mb-8">{post?.section6Heading} </p>
                  <div className="text-heading-2.5x font-regular tracking-tight text-center lg:leading-snug text-brand-primary">
                      {post.section6Description && <PortableText value={post.section6Description} />}
                  </div>
                </div>
              </Container>

              {post?.section6Images && <WorkSlider works={post.section6Images} sliderPerView={1} className='!border-r-0 !p-0 !mr-5' wrapperClassName='nav-white with-left-padding'/>}

            </div>

            <div className="full-width  theme-gray-bg pb-4">
              <Container>
                <div className="work-section-content text-center text-white">
                  <p className="fss-1 uppercase font-secondary text-center mb-8">{post?.section7Heading} </p>
                  <div className="text-heading-3x font-regular tracking-tight text-center lg:leading-snug text-brand-primary">
                      {post.section6Description && <PortableText value={post.section7Description} />}
                  </div>
                </div>
                <div className="relative work-section-image overflow-hidden">
                  
                {post?.section7videoImage && <MainImage image={post.section7videoImage} 
                                                          layout="fill" 
                                                          loading="eager" 
                                                          objectFit="cover" 
                                                          objectPosition="top"/>}
                  <div className="play-button" onClick={() => setModalShow(true)}>
                    <img src="/img/play-icon.svg" className="play-icon" />
                  </div>
                  
                </div>
                
              </Container>
              
            </div>
          
            <div className="full-width  theme-gray-bg py-4 md:py-14">
              <Container>
                <div className="grid md:grid-cols-2 grid-rows-1 gap-5">
                  <div className="md:pr-5 hidden md:block">
                    {post?.mainImage && <MainImage image={post.mainImage} />}
                  </div>

                  <div className="section-content grid content-center py-10">
                      <div className="vertical-center md:px-16 grid md:grid-cols-2">
                        {
                          map(post.services, obj => {
                            return <div className="service mb-5 md:mb-4" key={obj._key}>
                                      <span className="fss-1 font-secondary uppercase">
                                        {obj?.service}
                                      </span>
                                      <p className="fss-3 uppercase">
                                        {obj?.specialist}
                                      </p>
                                    </div>
                          })
                        }
                      </div>
                  </div>
                </div>
              </Container>
            </div>

            <div className={`modal video-modal ${modalShow?'':'hidden'}`}>
                <button type="button" className="btn-close" onClick={handleModalClose}>
                    <img src="/img/cross.svg" alt="cross-black"/>
                </button>
                <div className="modal-body grid grid-rows-3">
                    {post.section7videoUrl && 
                      <LiteYouTubeEmbed
                        aspectHeight = {9}
                        aspectWidth = {16}
                        id={post.section7videoUrl}
                        title={post?.campaign_name}
                        onIframeAdded={onPlayerReady}
                      />
                    }
                </div>
            </div>
        </Layout>
      )}
    </>
  );
}

const MainImage = ({ image,...rest }) => {
  return (
      <Image {...GetImage(image)} alt={image?.alt || "Thumbnail"} {...rest}/>
  );
};


const Section2Image = ({ image,sizes }) => {
  const imageProps = image ? GetImage(image) :  null
  return (
      <Image 
          src={imageProps.src}
          loader={imageProps.loader}
          blurDataURL={imageProps.blurDataURL}
          placeholder="blur"
          layout="responsive"
          width={sizes.w}
          height={sizes.h}
          priority={true}
          alt={image.alt || "Section Image"} 
      /> 
  );
};

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(singleWorkquery, {
    slug: params.slug
  });

  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postdata: { ...post },
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(workPathQuery);
  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug
        }
      })) || [],
    fallback: true
  };
}
