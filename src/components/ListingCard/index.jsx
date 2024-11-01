import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import VerifiedIcon from "../../assets/verified.svg";
import BedIcon from "../../assets/bed.svg";
import BathtubIcon from "../../assets/bath.svg";
import SquareFootIcon from "../../assets/cube.svg";

import "swiper/swiper-bundle.css";
import styles from "./index.module.css";

SwiperCore.use([Autoplay, Pagination]);

const ListingCard = ({ listing, visible }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 3,
        maxWidth: 345,
        width: 345,
        cursor:"pointer"
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={true}
        >
          {listing.media.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.cdnUrl}
                alt={`Slide ${index}`}
                className={styles.sliderImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {visible && (
          <Box className={styles.chipPosition}>
            <Chip label="New" color="primary" />
            <Chip label="3D Tour" color="secondary" />
          </Box>
        )}
      </Box>

      <CardContent className={styles.cardContent}>
        {visible && (
          <Box className={styles.flexCenter}>
            <Box className={styles.flexCenter}>
              <VerifiedIcon height="24px" width="24px" />
              <Typography className={styles.verified}>Verified</Typography>
            </Box>
            <Typography
              variant="caption"
              color="textSecondary"
              className={styles.days}
            >
              5 days ago
            </Typography>
          </Box>
        )}
        {visible && (
          <Typography component="div" className={styles.title}>
            {listing.title}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="textSecondary"
          className={styles.address}
        >
          {listing.address}, {listing.city}
        </Typography>
        <Box className={styles.contentContainer}>
          <Box className={styles.flexCenter}>
            <SquareFootIcon width="24" height="24" />
            <Typography className={styles.options}>
              {listing.size} m²
            </Typography>
          </Box>

          <Box className={styles.flexCenter}>
            <BedIcon width="24" height="24" />
            <Typography className={styles.options}>
              {listing.roomsBed} bed
            </Typography>
          </Box>

          <Box className={styles.flexCenter}>
            <BathtubIcon width="24" height="24" />
            <Typography className={styles.options}>
              {listing.roomsBath} bath
            </Typography>
          </Box>
        </Box>
        <Typography color="primary" className={styles.range}>
          €{listing.rentUtilities} - €{listing.rent}
        </Typography>
        {visible && (
          <Box className={styles.availableTextSection}>
            <Typography
              variant="body2"
              color="textSecondary"
              className={styles.availableTextContainer}
            >
              Available From:
              <span className={styles.availableText}>Immediately</span>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ListingCard;
