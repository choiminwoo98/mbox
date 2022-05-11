import {
  AnimatePresence,
  AnimationControls,
  MotionConfig,
  useAnimation,
} from "framer-motion";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cls } from "@libs/client/utils";
import AnimationText from "@components/animation-text";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import Modal from "components/Modal";
import Link from "next/link";

const albums = [
  { id: 1000, title: "elephant", url: "/assets/elephant-hd-quality.png" },
  {
    id: 1001,
    title: "lighthouse",
    url: "https://cdn.pixabay.com/photo/2017/06/04/23/17/lighthouse-2372461__340.jpg",
  },
  {
    id: 1002,
    title: "planet",
    url: "https://cdn.pixabay.com/photo/2016/09/29/13/08/planet-1702788__340.jpg",
  },
  {
    id: 1003,
    title: "water",
    url: "https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252__340.jpg",
  },
  {
    id: 1004,
    title: "sunset",
    url: "https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760__340.jpg",
  },
  {
    id: 1005,
    title: "sunset01",
    url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg",
  },
  {
    id: 1006,
    title: "sunset02",
    url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg",
  },
  {
    id: 1007,
    title: "sunset03",
    url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg",
  },
];

interface IAlbum {
  id: number;
  title: string;
  url: string;
}

const infoWrapperVariants = {
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 2 },
  },
};

const infoColVariants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const page = Math.min(albums.length - 1, 6);

const View: NextPage = () => {
  const [index, setIndex] = useState(0);
  const [perIndex, setPerIndex] = useState(0);
  const [delay, setDelay] = useState(false);

  const [isopen, setIsOpen] = useState(false);
  const [isopen1, setIsOpen1] = useState(false);
  const [isopen2, setIsOpen2] = useState(false);
  const [isopen3, setIsOpen3] = useState(false);

  const [album, setAlbums] = useState([
    { id: 1000, title: "elephant", url: "/assets/elephant-hd-quality.png" },
    {
      id: 1001,
      title: "lighthouse",
      url: "https://cdn.pixabay.com/photo/2017/06/04/23/17/lighthouse-2372461__340.jpg",
    },
    {
      id: 1002,
      title: "planet",
      url: "https://cdn.pixabay.com/photo/2016/09/29/13/08/planet-1702788__340.jpg",
    },
    {
      id: 1003,
      title: "water",
      url: "https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252__340.jpg",
    },
    {
      id: 1004,
      title: "sunset",
      url: "https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760__340.jpg",
    },
    {
      id: 1005,
      title: "sunset01",
      url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg",
    },
    {
      id: 1006,
      title: "sunset02",
      url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg",
    },
    {
      id: 1007,
      title: "sunset03",
      url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg",
    },
  ]);
  // 앨범 삭제 기능
  const onRemove = (id) => {
    setAlbums(album.filter((album) => album.id !== id));
    console.log(album);
  };
  const perAlbums = [];

  if (page) {
    for (let i = 0; i < page; i++) {
      perAlbums.push({
        ...albums[(index + i) % albums.length],
        id: (perIndex + i) % (page * 2 + 1),
      });
    }
  }

  const onClick = () => {
    if (!delay) {
      setDelay(true);
      setIndex((prev) => (prev + 1) % albums.length);
      setPerIndex((prev) => (prev + 1) % (page * 2 + 1));
    }
  };

  return (
    <div
      // onClick={onClick}
      className="relative py-4 mx-auto w-screen max-w-6xl h-screen overflow-hidden bg-gray-800"
    >
      <div
        style={{ gridTemplateColumns: "2fr 1fr" }}
        className="h-full grid grid-cols items-center mr-16"
      >
        <div
          style={{
            perspective: "250px",
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full transform-gpu flex justify-end"
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(10deg) scaleY(1.2)",
            }}
            className="relative w-full h-full flex justify-center items-center"
          >
            <AnimatePresence
              onExitComplete={() => {
                setDelay(false);
              }}
            >
              {perAlbums.map((album, i) => (
                <motion.div
                  key={album.id}
                  exit={{
                    opacity: 0,
                    x: 200,
                    z: 200,
                  }}
                  initial={{
                    x: -i * 60,
                    z: -i * 60,
                    filter: `blur(${i * 0.5}px)`,
                  }}
                  animate={{
                    x: 60 - i * 60,
                    z: 60 - i * 60,
                    filter: `blur(${i * 0.5}px)`,
                  }}
                  transition={{
                    default: { duration: 1.5 }, // 1.5
                  }}
                  className="absolute w-2/4 aspect-video"
                >
                  <div className="relative w-full h-full">
                    <motion.div className="absolute w-full h-full bg-white rounded-md" />
                    <motion.div
                      style={{
                        maskImage:
                          i == 0 ? "url(assets/sprites/slider-sprite.png)" : "",
                        WebkitMaskImage:
                          i == 0 ? "url(assets/sprites/slider-sprite.png)" : "",
                        maskSize: "3000% 100%",
                        WebkitMaskSize: "3000% 100%",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: i === 0 ? 1 : 0,
                        transition: {
                          delay: 1,
                          duration: 1.5, // 1.5,
                        },
                      }}
                      className={cls(
                        "relative w-full h-full rounded-md",
                        i === 0 ? "slider" : ""
                      )}
                    >
                      <Image src={album.url} layout="fill" alt="" />
                    </motion.div>
                  </div>
                  <div className="absolute w-full h-1/2 top-[102%] overflow-hidden">
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{
                        opacity: i === 0 ? 0 : 1,
                        transition: { duration: 2 },
                      }}
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.2) 1%, rgba(31, 41, 55, 1) 40%, rgba(31, 41, 55, 1) 100%)",
                      }}
                      className="absolute w-full h-[200%] rounded-md"
                    />
                    <motion.div
                      style={{
                        maskImage:
                          i == 0 ? "url(assets/sprites/slider-sprite.png)" : "",
                        WebkitMaskImage:
                          i == 0 ? "url(assets/sprites/slider-sprite.png)" : "",

                        maskSize: "3000% 100%",
                        WebkitMaskSize: "3000% 100%",
                        transform: "rotateX(180deg)",
                        backgroundImage: `url(${album.url})`,
                        backgroundSize: "100% 100%",
                      }}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: i === 0 ? 0.5 : 0,

                        transition: {
                          delay: 1,
                          duration: 1.5,
                        },
                      }}
                      className={cls(
                        "relative w-full bg-center bg-no-repeat bg-cover h-[200%] rounded-md",
                        i === 0 ? "slider" : ""
                      )}
                    >
                      <div
                        style={{
                          background:
                            "linear-gradient(to top, transparent 1%, rgba(31, 41, 55, 1) 40%, rgba(31, 41, 55, 1) 100%) ",
                        }}
                        className="w-full h-full"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div key={index} className="flex flex-col">
          <div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">
                <AnimationText
                  staggerTime={0.1}
                  text="Title"
                  kind="fading"
                  className="text-white"
                />
              </h2>
              {/* 수정 삭제로 들어가는 모달 */}
              <Modal open={isopen} onClose={() => setIsOpen(false)}>
                <div>
                  <button onClick={() => setIsOpen2(true)}>수정</button>
                  <button onClick={() => setIsOpen3(true)}>삭제</button>
                </div>
              </Modal>
              {/* 앨범 수정 부분 모달 */}
              <Modal open={isopen2} onClose={() => setIsOpen2(false)}>
                <input type="file" id="files" name="files" multiple></input>
                <div>
                  <input placeholder="제목"></input>
                  <input placeholder="설명"></input>
                </div>
              </Modal>

              {/* 앨범 삭제 부분 모달 */}
              <Modal open={isopen3} onClose={() => setIsOpen3(false)}>
                <div>
                  <h1>해당 앨범을 삭제하시겠습니까?</h1>
                  <button onClick={(index) => onRemove(index)}>yes</button>/
                  <button onClick={null}>no</button>
                </div>
              </Modal>
              <div className="">
                {/* 수정 삭제 들어가는 버튼  */}
                <button className="" onClick={() => setIsOpen(true)}>
                  hello
                </button>
              </div>
            </div>
            <AnimatePresence>
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={infoWrapperVariants}
              >
                <MotionConfig
                  transition={{
                    default: {
                      ease: "easeInOut",
                      duration: 0.5,
                    },
                  }}
                >
                  <motion.div
                    className="w-full flex space-x-2 text-gray-500"
                    variants={infoColVariants}
                  >
                    <div className="whitespace-nowrap">
                      {new Date().toDateString()}
                    </div>
                    <span>/</span>
                    <div>#태그 #태그 #태그</div>
                  </motion.div>
                  <motion.p className="text-white" variants={infoColVariants}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dignissimos optio fugiat reiciendis quam. Error debitis qui
                    numquam ducimus corporis nihil distinctio necessitatibus
                    iste aperiam? Minus exercitationem distinctio natus
                    excepturi autem.
                  </motion.p>
                  <div className="text-center">
                    {/* 해당 앨범 내부로 들어가는 버튼 */}
                    <Link href="/">
                      <button> hello</button>
                    </Link>
                  </div>
                </MotionConfig>
              </motion.div>
            </AnimatePresence>
          </div>
          <div></div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <ul className="flex justify-between space-x-4 py-2 mx-4">
          {albums.map((album, i) => (
            <li
              key={i}
              className="relative text-white"
              onClick={() => {
                const gap = (albums.length - (index - i)) % albums.length;
                console.log(`gap: ${gap}`);
                setIndex(i);
                setAlbums(album.id);
                if (gap <= 6)
                  setPerIndex((prev) => (prev + gap) % (page * 2 + 1));
                else setPerIndex((prev) => (prev + 6) % (page * 2 + 1));
              }}
            >
              <h4>{album.title}</h4>
              {i == index && (
                <motion.div
                  layoutId={"underline"}
                  className="w-full h-1 absolute -bottom-[2px] bg-red-400 rounded-md"
                />
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default View;
