import { useEffect, useState, useRef } from 'react';
// import './Attractions.css';
import Carousell from '../Carousell';
import AttractionsList from '../../../Data/Attractions';
import { useLocation, useSearchParams } from 'react-router-dom';
import Fade from "react-reveal/Fade";
import Attraction1 from "../../../assets/new_images/Image_from_iOS_11.jpg"
import Attraction2 from "../../../assets/new_images/Image_from_iOS_8.jpg"
import Attraction3 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_239.jpg"

// Import attraction images
import jetSkiImage from "../../../assets/images/attractions/jetski.jpeg"
import wellCraftImage from "../../../assets/images/attractions/wellCraft.jpeg"

const Attractions = () => {
  const [currentAttr,setCurrentAttr] = useState(0)
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const attrRef = useRef(null);

  // Override specific attraction images with local images
  const getAttractionImage = (attraction: any) => {
    const name = attraction.name.toLowerCase();
    if (name === 'jet ski') {
      return jetSkiImage;
    } else if (name === 'well craft boat') {
      return wellCraftImage;
    }
    return attraction.image;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Get the hash from the URL
    if (searchParams.get("to")==="attr") {
      const sectionElement:any = attrRef.current;
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        setCurrentAttr(Number(searchParams.get("pos")))
      }
    }
  }, [location]);

  const handleClick = (index:number)=> {
    setCurrentAttr(index)
  }

  return (
    <div id="attractions" className="page">
      <Carousell>
        {/* Carousel Content */}
        <div className="hero bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Attraction3})` }}>
          <p>Quad Bikes</p>
        </div>
        <div className="hero bg-left-top" style={{ backgroundImage: `url(${Attraction2})` }}>
         <p> Swimming Pool</p>
        </div>
        <div className="hero bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Attraction1})` }}>
         <p> Paintball</p>
        </div>
      </Carousell>
      <section ref={attrRef} className="px-16 py-12 sm:px-5">
        <h2 className="text-4xl font-extralight text-center my-4 sm:text-2xl font-playfair">
          Attractions
        </h2>
        <div className="text-black/50 font-normal sm:text-base sm:px-3">
          <p>
          We are thrilled to introduce you to the incredible attractions that will make your stay truly unforgettable. Prepare to be captivated by the beauty of our resort and the endless possibilities for excitement and rejuvenation.
          </p>
          <p className="mt-6">
          We have a wide range of attractions and activities to ensure that every guest experiences the ultimate adventure and relaxation. Get ready to immerse yourself in a world of excitement with our diverse selection of attractions:
          </p>
        </div>
        <section className='mt-6 px-16 sm:px-4'>
          <div className='flex flex-row gap-x-4 gap-y-3 flex-wrap'>
            {
              AttractionsList.map((attr:any,index:number)=>{
                return (
                  <button onClick={()=>handleClick(index)} className={currentAttr===index?"bg-black hover:scale-105 text-white px-3 py-2 h-[40px]":"bg-black/10 text-black px-3 py-2 h-[40px] hover:bg-black hover:!text-white"} 
                    key={index}>
                      {attr.name}
                  </button>
                )
              })
            }
          <section className="px-16 sm:px-4 py-6 mintablet:py-8">
            <h2 className="text-[24px] font-extralight text-start mintablet:hidden">{AttractionsList[currentAttr].name}</h2>
              <div className=' grid grid-cols-1 w-full   minLg:px-[100px]  justify-center items-center  mintablet:grid-cols-12 gap-x-10'>
                <Fade bottom duration={1000}>
                  <img className='hidden object-cover mintablet:block rounded-[10px] col-span-4 mintablet:col-span-6 w-full  minMd:w-[450px] h-[350px]' src={getAttractionImage(AttractionsList[currentAttr])} alt=""/>
                </Fade>
                <div className='col-span-1 mintablet:col-span-6'>
                  <h2 className="hidden mintablet:block text-[24px] font-extralight text-start">{AttractionsList[currentAttr].name}</h2>
                  <p className="text-start  text-black/50 my-4 font-normal ">
                    {AttractionsList[currentAttr].description}
                  </p>
                </div>
             <Fade bottom duration={1000}>
             <img className='mintablet:hidden object-cover rounded-[10px] col-span-1 w-full  minMd:w-[450px] h-[350px]' src={getAttractionImage(AttractionsList[currentAttr])} alt=""/>
             </Fade>
              </div>
          </section>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Attractions;