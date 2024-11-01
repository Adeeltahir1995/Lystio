import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "@mui/icons-material/Verified";
import BedIcon from "../../assets/bed.svg";
import BathtubIcon from "../../assets/bath.svg";
import SquareFootIcon from "../../assets/cube.svg";

const ListingCard = ({ listing, visible }) => {
  return (
    <Card
      sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 3, maxWidth: 345 }}
    >
      {/* Image Slider */}
      <Box sx={{ position: "relative" }}>
        <Swiper spaceBetween={0} slidesPerView={1}>
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

        {/* Overlay Chips */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            gap: 1,
          }}
        >
          <Chip label="New" color="primary" />
          <Chip label="3D Tour" color="secondary" />
        </Box>

        {/* Favorite Icon */}
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
      <CardContent>
        {visible && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VerifiedIcon color="primary" fontSize="small" />
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontFamily: "Alliance No.1" }}
            >
              Verified
            </Typography>
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
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Alliance No.1",
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: "22.5px",
              textAlign: "left",
              color: "#000000",
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
            gap: 1,
            alignItems: "center",
            my: 1,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "2px", alignItems: "center" }}>
            <SquareFootIcon width="24" height="24" />
            <Typography
              variant="body2"
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

          <Box sx={{ display: "flex", gap: "2px", alignItems: "center" }}>
            <BedIcon width="24" height="24" />
            <Typography
              variant="body2"
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

          <Box sx={{ display: "flex", gap: "2px", alignItems: "center" }}>
            <BathtubIcon width="24" height="24" />
            <Typography
              variant="body2"
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
