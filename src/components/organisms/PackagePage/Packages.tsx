import React, { useEffect, useState } from 'react';
import './Packages.css';
import Carousell from '../Carousell';
import { GetPackages } from '../../../services/Package';
import Logger from '../../../utils/Logger';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import BookTypes from '../../../Constants/BookTypes';
import Fade from "react-reveal/Fade"
import HighlightedText from '../HighlightedText';
import { toast } from 'react-toastify';

// Package Images - Organized by Tier
// Regular Tier
import regularFee from "../../../assets/Package Images/regularFee.jpg"

// Silver Tier
import silverOnePerson from "../../../assets/Package Images/silverOnePerson.jpg"
import silverFourPeople from "../../../assets/Package Images/silverFourPeople.jpg"
import silverEightPeople from "../../../assets/Package Images/silverEightPeople.jpg"

// Gold Tier
import goldOnePerson from "../../../assets/Package Images/goldOnePerson.jpg"
import goldFourPeople from "../../../assets/Package Images/goldFourPeople.jpg"
import goldEightPeople from "../../../assets/Package Images/goldEightPeople.jpg"

// Platinum Tier
import platinumOnePerson from "../../../assets/Package Images/platinumOnePerson.jpg"
import platinumFourPeople from "../../../assets/Package Images/platinumFourPeople.jpg"
import platinumEightPeople from "../../../assets/Package Images/platinumEightPeople.jpg"

// Diamond Tier
import diamondOnePerson from "../../../assets/Package Images/diamondOnePerson.jpg"
import diamondFourPeople from "../../../assets/Package Images/diamondFourPeople.jpg"
import diamondEightPeople from "../../../assets/Package Images/diamondEightPeople.jpg"

// Carousel images
import Package1 from "../../../assets/images/packages/Screenshot_20230315_231549_Gallery.jpg"
import Package2 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_4_b&n.jpg"
import Package3 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_321-1.jpg"
import Package4 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_47.jpg"

// Static package data organized by tiers
const packageTiers = [
  {
    tier: "Regular",
    packages: [
      { _id: 'regular-1', name: 'Regular Gate Fee', image: regularFee },
    ]
  },
  {
    tier: "Silver",
    packages: [
      { _id: 'silver-1', name: 'Silver - One Person', image: silverOnePerson },
      { _id: 'silver-2', name: 'Silver - Four People', image: silverFourPeople },
      { _id: 'silver-3', name: 'Silver - Eight People', image: silverEightPeople },
    ]
  },
  {
    tier: "Gold",
    packages: [
      { _id: 'gold-1', name: 'Gold - One Person', image: goldOnePerson },
      { _id: 'gold-2', name: 'Gold - Four People', image: goldFourPeople },
      { _id: 'gold-3', name: 'Gold - Eight People', image: goldEightPeople },
    ]
  },
  {
    tier: "Platinum",
    packages: [
      { _id: 'platinum-1', name: 'Platinum - One Person', image: platinumOnePerson },
      { _id: 'platinum-2', name: 'Platinum - Four People', image: platinumFourPeople },
      { _id: 'platinum-3', name: 'Platinum - Eight People', image: platinumEightPeople },
    ]
  },
  {
    tier: "Diamond",
    packages: [
      { _id: 'diamond-1', name: 'Diamond - One Person', image: diamondOnePerson },
      { _id: 'diamond-2', name: 'Diamond - Four People', image: diamondFourPeople },
      { _id: 'diamond-3', name: 'Diamond - Eight People', image: diamondEightPeople },
    ]
  },
];


const Packages = () => {
  //const [roomTypes, setRoomTypes] =  useState([])
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();
  const [matchText, setMatchText]  = useState("")


  useEffect (()=>{
    const fetchPackages = ()=> {
        setIsLoading(true)
        GetPackages().then(
          res=>{
            setIsLoading(false)
            Logger("Packages", res.data)
            setPackages(res.data)
          },
          err=>{
            //setIsLoading(false)
            console.log(err)
          }
        )
    
    }
    
   fetchPackages()
  },[])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Get the hash from the URL
    //const { hash } = location;

      const sectionElement:any = document.getElementById(searchParams.get("to") as any);
      if (sectionElement) {
       
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        setMatchText(searchParams.get("name")?.replace(/ /g,' ') as any)
        console.log(searchParams.get("name")?.replace(/ /g,' '))
      }
  });

  useEffect(()=>{
    const message = searchParams.get("message")
    if (message && !(message?.length<=0)) {
      toast.error(message, {autoClose:false})
      searchParams.set("message","")
    }
  },[])


  const handleClick = (id:string)=> {
    navigate(`/booking/${BookTypes.PACKAGE}?item_id=${id}`)
  }

  return (
    <div id="packages">
      <Carousell>
        {/* Carousel */}
        <div className="hero bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Package1})` }}>
          <p>Regular Gate Fee</p>
        </div>
        <div className="hero bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Package2})` }}>
         <p>Silver Ticket (8am - 6pm)</p>
        </div>
        <div className="hero bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Package3})` }}>
          <p>Gold Ticket (8am - 6pm)</p>
        </div>
        <div className="hero bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Package4})` }}>
          <p>Diamond Ticket (8am - 6pm)</p>
        </div>
      </Carousell>
      {/* End of Carousel */}
      {/* Package Section */}
      <section className="px-16 py-12 sm:px-5">
        <h2 className="text-4xl font-extralight text-center my-4 font-playfair">
          Packages
        </h2>
        <div className="mt-6 flex justify-center">
          <p className="text-black/50 font-normal mintablet:w-[70%] text-center">
            At Bolowei’s World Resort, We believe in tailor-made experiences that suit your every vacation desire. We've curated a range of exciting packages designed to cater to your unique preferences and create memories that will leave you longing for more. Whether you're seeking a tranquil escape, an action-packed adventure, or a romantic rendezvous, we have the perfect package just for you.
            No matter which package you choose, rest assured that our attentive staff will go above and beyond to ensure that every detail of your stay is flawless. So, pick your package, pack your bags, and get ready for an extraordinary experience. Your dream vacation awaits!
          </p>
        </div>
        {/* Display packages organized by tiers */}
        {packageTiers.map((tierGroup, tierIndex) => (
          <div key={tierGroup.tier} className="mb-16">
            {/* Tier Heading */}
            <h3 className="text-3xl font-semibold text-center my-8 text-[#1AACAC]">
              {tierGroup.tier} Tier
            </h3>
            
            {/* Packages in this tier */}
            <div className="flex flex-wrap gap-x-6 gap-y-6 flex-col minMd:flex-row minMd:justify-center">
              {tierGroup.packages.map((pack, index) => (
                <Fade duration={3000} delay={100 * index} key={pack._id}>
                  <div 
                    id={pack._id} 
                    className="cursor-pointer group z-20 relative flex-col shadow-lg mintablet:w-[350px] minMd:w-[45%] w-full rounded-md"
                  >
                    <img
                      src={pack.image}
                      alt={pack.name}
                      loading='lazy'
                      className='h-[500px] w-full z-10 rounded-md object-cover'
                    />
                    
                    {/* Overlay with Buy ticket button */}
                    <div className='absolute bg-transparent group-hover:bg-black/20 rounded-sm hidden z-30 group-hover:flex transition-colors duration-1000 items-end justify-center w-full top-0 h-full'>
                      <a 
                        href="https://wa.me/2348025229444"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1AACAC] border-[#1AACAC] text-white px-20 my-6 rounded-lg py-4 border-solid border-[1px] font-bold no-underline"
                      >
                        Buy ticket
                      </a>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Packages;