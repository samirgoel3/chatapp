import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FaNodeJs, FaGithub, FaReact } from 'react-icons/fa';
import { SiMongodb } from "react-icons/si";
import { ImCamera } from "react-icons/im";
import { DiNodejs } from "react-icons/di";


const ICONS = {
    OPEN_EYE_ICON : Visibility,
    CLOSE_EYE_ICON : VisibilityOff,
    NODE:FaNodeJs,
    NODEJS:DiNodejs,
    GITHUB:FaGithub,
    MONGO_DB:SiMongodb,
    CAMERA:ImCamera,
    REACT:FaReact
}

export default ICONS;