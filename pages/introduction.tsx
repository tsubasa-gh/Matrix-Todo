import React, { useRef } from 'react';
import { Container, Box, Typography, Button, IconButton } from '@mui/material';
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SwiperCore from 'swiper';

const slides = [
    {
        label: 'Matrix Todoへようこそ！',
        description: 'このアプリは「時間管理のマトリックス」に基づいたタスク管理アプリです。',
        imgPath: 'slide1.png',
    },
    {
        label: '何ができる？',
        description: '「重要度」と「緊急度」に基づいてタスクを分類することで、リソースを適切に配分し、あなたのパフォーマンスを最大化します。',
        imgPath: 'slide2b.png',
    },
    {
        label: 'さあ、今すぐはじめよう！',
        description: '',
        imgPath: 'slide3.png',
    },
];

const Introduction = () => {
    const swiperRef = useRef<SwiperCore>();

    const router = useRouter();

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handleBack = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, position: 'relative' }}>
            <Typography variant="h2" align="center" gutterBottom>
                <strong>Welcome to Matrix Todo !</strong>
            </Typography>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation, Pagination]}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                pagination={{ clickable: true }}
                style={{ paddingBottom: '30px' }} // スライドの下部に余白を追加
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: 'center',
                                height: 500,
                                bgcolor: '#f5f5f5',
                                boxShadow: 3,
                                p: 5,
                                m: 2,
                                borderRadius: 2,
                            }}
                        >
                            {slide.imgPath && (
                                <Box sx={{ flex: 1, p: 2 }}>
                                    <img src={slide.imgPath} alt={slide.label} style={{ maxWidth: '100%', height: 'auto' }} />
                                </Box>
                            )}
                            <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography align="center" variant="h5" sx={{ mb: 2 }}>
                                    <strong>{slide.label}</strong>
                                </Typography>
                                <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                                    {slide.description}
                                </Typography>
                                {(index === 0 || index === 2) && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                                        <Button onClick={() => router.push('/signUp')} variant="contained">新規登録</Button>
                                        <Button onClick={() => router.push('/login')} variant="contained">ログイン</Button>
                                    </Box>
                                )}
                            </Box>  
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
            <IconButton className="swiper-button-prev" sx={{ zIndex: 10 }}>
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton className="swiper-button-next" sx={{ zIndex: 10 }}>
                <KeyboardArrowRight />
            </IconButton>
        </Container>
    );
};

export default Introduction;
