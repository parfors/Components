import { iNews } from "@/Interfaces/news";
import DefaultImage from "../customImage/DefaultImage";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import separateLink from "@/utils/separateLink";
import { useState, useEffect } from "react";
import zIndex from "@mui/material/styles/zIndex";

interface iPropsNewsPreview{
  newsArray: iNews[],
}

const CarouselNews = ({ newsArray }: iPropsNewsPreview) => {
  const { t } = useTranslation()
  const [slide, setSlide] = useState(0);
  const mainStyles = `flex items-center transition duration-1000`;
  const noneStyle = 'flex absolute translate-x-[103%] top-0'

  useEffect(() => {
    const interval = setInterval(() => {
      if (slide === newsArray.length - 1) {
        setSlide(0);
      } else {
        setSlide(slide + 1)
      }
    }, 4000);
    return ()=>{clearInterval(interval)}
  }, [slide])



  const clickEvent= () => {
    setSlide(slide === newsArray.length-1 ? 0 : slide + 1)
  }

  return (
  <div>
    <div className="relative">
      {newsArray.map((el, ind) => (
        <div className={slide === ind ? mainStyles : noneStyle}
          style={slide+1 === ind? {zIndex: '10'} : {zIndex: '7'}}
          key={el.id}>
          <div className="mr-[40px] overflow-hidden w-[320px] h-[160px]" >
            <DefaultImage
              className="
                  w-full 
                  h-full 
                  object-cover 
                  object-center"
                src={`${el.attributes.cover?.data.attributes.url || ''}`}
                alt='news-photo'
                quality={50}
                width={800}
                height={600}
              />
          </div>    
          <div className="w-[65%] flex flex-col">
            <h3 className="mb-3 text-lg ">{el.attributes.title}</h3>
            <p className="                
                    text-primaryDarkGrey
                    sm:text-xs
                    lg:text-sm
                    xl:text-base
                    2xl:text-base
                    font-[300]">{el.attributes.subtitle}</p>
            <span className="mt-auto">
            <Link 
            href={`/news/${separateLink(el.attributes.url)}`}
              className='
              text-linkBlue 
                font-[400]
                sm:text-sm lg:text-md 
                xl:text-base 
                2xl:text-[18px]
                hover:text-linkBlueHover'>
                {t('components.newsPreview.view')}
            <Image className='inline ml-1' src='/svg/arrowRightHeader.svg' width={10} height={10} alt='An SVG of an arrow'/>
            </Link>
            </span>
          </div>
          <div className="cursor-pointer absolute top-[50%] right-[4%] translate-y-[-50%]">
            <Image onClick={clickEvent} className='' src='/svg/newsArrowRight.svg' width={30} height={30} alt='An SVG of an arrow'/>
          </div>
        </div>
      ))}

      </div>
  </div>
  );
}

export default CarouselNews