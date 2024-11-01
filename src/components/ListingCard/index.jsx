import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "../../assets/verified.svg";
import BedIcon from "../../assets/bed.svg";
import BathtubIcon from "../../assets/bath.svg";
import SquareFootIcon from "../../assets/cube.svg";

SwiperCore.use([Autoplay, Pagination]);

const ListingCard = ({ listing, visible }) => {
  return (
    <Card
      sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 3, maxWidth: 345 }}
    >
      {/* Image Slider */}
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
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {visible && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              display: "flex",
              gap: 1,
              zIndex: 1000,
            }}
          >
            <Chip label="New" color="primary" />
            <Chip label="3D Tour" color="secondary" />
          </Box>
        )}

        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ padding: "12px !important" }}>
        {" "}
        {/* Removed padding-bottom */}
        {visible && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <VerifiedIcon height="24px" width="24px" />
              <Typography
                sx={{
                  fontFamily: "Alliance No.1",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "16.8px",
                  textAlign: "left",
                  color: "#5A0CFF",
                  marginBottom: "6px",
                }}
              >
                Verified
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{
                fontFamily: "Alliance No.1",
                fontSize: "12px",
                lineHeight: "14.4px",
                ml: "auto",
              }}
            >
              5 days ago
            </Typography>
          </Box>
        )}
        {visible && (
          <Typography
            component="div"
            sx={{
              fontFamily: "Alliance No.1",
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: "22.5px",
              textAlign: "left",
              color: "#000000",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {listing.title}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontFamily: "Alliance No.1" }}
        >
          {listing.address}, {listing.city}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: 1,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SquareFootIcon width="24" height="24" />
            <Typography
              sx={{
                fontFamily: "Alliance No.1",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "16.8px",
                textAlign: "left",
              }}
            >
              {listing.size} m²
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BedIcon width="24" height="24" />
            <Typography
              sx={{
                fontFamily: "Alliance No.1",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "16.8px",
                textAlign: "left",
              }}
            >
              {listing.roomsBed} bed
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BathtubIcon width="24" height="24" />
            <Typography
              sx={{
                fontFamily: "Alliance No.1",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "16.8px",
                textAlign: "left",
              }}
            >
              {listing.roomsBath} bath
            </Typography>
          </Box>
        </Box>
        <Typography
          color="primary"
          sx={{
            mt: 1,
            fontFamily: "Alliance No.1",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "21.6px",
            textAlign: "left",
          }}
        >
          €{listing.rentUtilities} - €{listing.rent}
        </Typography>
        {visible && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ ml: 0.5, fontFamily: "Alliance No.1" }}
            >
              Available From: Immediately
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ListingCard;
