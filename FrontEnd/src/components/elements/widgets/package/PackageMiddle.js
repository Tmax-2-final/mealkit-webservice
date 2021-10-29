import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



export default function PackageMiddle({props, packageData}) {

    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    return (

        <div className="shop-area pt-100 pb-100">
            <div className="container">
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="상품 설명" />
                        <Tab value="two" label="상세 정보" />
                        <Tab value="three" label="후기" />
                        <Tab value="fouth" label="문의" />
                    </Tabs>
                </Box>
            </div>
        </div>

    );


}

