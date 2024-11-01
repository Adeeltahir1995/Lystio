import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Avatar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VerifiedIcon from '@mui/icons-material/Verified';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ListingCard = ({ listing }) => {
  return (
    <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3, maxWidth: 345 }}>
      {/* Image Slider */}
      <Box sx={{ position: 'relative' }}>
        <Swiper spaceBetween={0} slidesPerView={1}>
          {listing.media.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.cdnUrl}
                alt={`Slide ${index}`}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay Chips */}
        <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
          <Chip label="New" color="primary" />
          <Chip label="3D Tour" color="secondary" />
        </Box>

        {/* Favorite Icon */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VerifiedIcon color="primary" fontSize="small" />
          <Typography variant="caption" color="textSecondary">
            Verified
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ ml: 'auto' }}>
            5 days ago
          </Typography>
        </Box>

        <Typography variant="h6" component="div" sx={{ mt: 1, mb: 0.5 }}>
          {listing.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {listing.address}, {listing.city}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', my: 1 }}>
          <SquareFootIcon fontSize="small" />
          <Typography variant="body2">{listing.size} m²</Typography>
          <BedIcon fontSize="small" />
          <Typography variant="body2">{listing.roomsBed} bed</Typography>
          <BathtubIcon fontSize="small" />
          <Typography variant="body2">{listing.roomsBath} bath</Typography>
        </Box>

        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          €{listing.rent} - €{listing.rentUtilities}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <CalendarTodayIcon fontSize="small" />
          <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
            Available From: Immediately
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
