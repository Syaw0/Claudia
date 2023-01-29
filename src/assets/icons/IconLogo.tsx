const IconLogo = ({ height, width, ...params }: IconTypes) => {
  return (
    <svg
      {...params}
      width={width}
      height={height}
      viewBox="0 0 109 109"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddd_46_2132)">
        <rect
          x="8"
          y="7"
          width="93"
          height="93"
          rx="46.5"
          fill="url(#paint0_linear_46_2132)"
          shapeRendering="crispEdges"
        />
        <g filter="url(#filter1_d_46_2132)">
          <path
            d="M33.4814 73.2038L39.5131 72.6761L36.2209 35.0464L30.1892 35.5741L29.2462 24.795L58.0103 22.3569C60.6824 22.1231 63.163 22.3897 65.4521 23.1566C67.7649 23.8954 69.797 25.0116 71.5484 26.5052C73.2976 27.973 74.7085 29.7578 75.7812 31.8598C76.8776 33.9336 77.5324 36.1898 77.7458 38.6284C77.9954 41.4821 77.6961 43.8871 76.8478 45.8435C76.0254 47.7976 74.7431 49.426 73.0011 50.7286C75.0557 51.8036 76.7214 53.2133 77.998 54.9576C79.2984 56.6737 80.0632 58.8419 80.2924 61.4621C80.5262 64.1342 80.2737 66.6266 79.535 68.9394C78.8222 71.2499 77.7331 73.2927 76.2676 75.0678C74.8258 76.8147 73.0551 78.2374 70.9553 79.3361C68.8533 80.4088 66.5441 81.0552 64.0277 81.2754L34.4142 83.8662L33.4814 73.2038ZM51.2307 57.8092L52.4325 71.5458L62.2387 70.6879C62.9911 70.6221 63.6745 70.3662 64.289 69.9203C64.9295 69.4722 65.456 68.9164 65.8685 68.2529C66.3046 67.5612 66.6291 66.7878 66.8418 65.9327C67.0523 65.0516 67.1178 64.1571 67.0384 63.2491C66.9544 62.2892 66.7345 61.4196 66.3788 60.6404C66.0208 59.8352 65.5693 59.1558 65.0241 58.6022C64.4768 58.0227 63.8511 57.5939 63.147 57.3156C62.4667 57.0092 61.7633 56.8877 61.037 56.9513L51.2307 57.8092ZM49.1403 33.9161L50.2978 47.1468L59.5593 46.3365C60.2857 46.273 60.9573 46.0313 61.5741 45.6113C62.1909 45.1914 62.7067 44.6626 63.1214 44.0251C63.5599 43.3594 63.8888 42.6378 64.1084 41.8605C64.3257 41.0573 64.398 40.2406 64.3254 39.4104C64.255 38.6062 64.042 37.8145 63.6862 37.0352C63.3305 36.256 62.8778 35.5636 62.3282 34.9582C61.8045 34.3505 61.2013 33.8804 60.5187 33.548C59.8338 33.1897 59.1282 33.0423 58.4018 33.1058L49.1403 33.9161Z"
            fill="#1A1C1B"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_ddd_46_2132"
          x="0"
          y="0"
          width="109"
          height="109"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_46_2132"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_46_2132"
            result="effect2_dropShadow_46_2132"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_46_2132"
            result="effect3_dropShadow_46_2132"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_46_2132"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_46_2132"
          x="28.2461"
          y="20.6414"
          width="54.6426"
          height="68.2249"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_46_2132"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_46_2132"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_46_2132"
          x1="12.541"
          y1="2.00489"
          x2="97.4579"
          y2="119.39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#95DDCE" />
          <stop offset="1" stopColor="#959CDD" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconLogo;
