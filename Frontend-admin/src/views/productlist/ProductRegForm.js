import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import S3 from 'react-aws-s3';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function ProductRegForm() {

  const [countList, setCountList] = useState([0]);
  const [name, setName] = useState();
  const [stock, setStock] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [category, setCategory] = useState();
  const [ rating, setRating ] = useState();
  const [ image1, setImage1 ] = useState();
  const [ image2, setImage2 ] = useState();
  const [ image3, setImage3 ] = useState();
  const [ image4, setImage4 ] = useState();
  const [ image5, setImage5 ] = useState();
  const [ image6, setImage6 ] = useState();
  const [ flavor, setFlavor ] = useState();
  const [ cookingtime, setCookingtime ] = useState();
  const [ age, setAge ] = useState();
  const [ details, setDetails ] = useState();

    const fileInput1 = useRef();
    const fileInput2 = useRef();
    const fileInput3 = useRef();
    const fileInput4 = useRef();
    const fileInput5 = useRef();
    const fileInput6 = useRef();

    const S3_BUCKET = 'tmax-2';
    const REGION = 'ap-northeast-2';

    const ACCESS_KEY = 'AKIATJ2JIKKMKGGO3UF7';
    const SECRET_ACCESS_KEY = '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';
    let newFileName1 = '';
    let newFileName2 = '';
    let newFileName3 = '';
    let newFileName4 = '';
    let newFileName5 = '';
    let newFileName6 = '';


    const history = useHistory();

    const [guideTxts, setGuideTxts] = useState({
        userGuide : '최대 20자 까지 가능합니다.',
        stockGuide : '최대 100개 까지 가능합니다.',
        priceGuide : '최소 1000원 입니다.',
        // authorGuide : '한글 or 영어로 작성해주세요.',
        // publisherGuide : '한글로 작성해주세요.',
        categoryGuide : '자기계발서, 경제 경영, 과학, 소설, 수험서 중 하나만 작성해주세요.',
        ratingGuide : '최고 5점 최저 1점 입니다.',
        imageGuide : "'jpg/jpeg' 포맷으로만 입력해주세요"
    });

    const [error, setError] = useState({
        nameError: '',
        authorError: '',
        stockError: '',
        priceError: '',
        categoryError: '',
        publisherError: '',
        ratingError: '',
        detailsError: ''
    })

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };

  const stockHandler = (e) => {
    e.preventDefault();
    setStock(e.target.value);
  };

  const unitPriceHandler = (e) => {
    e.preventDefault();
    setUnitPrice(e.target.value);
  };

  const categoryHandler = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const ratingHandler = (e) => {
    e.preventDefault();
    setRating(e.target.value);
  };

  const image1Handler = (e) => {
    e.preventDefault();
    setImage1(e.target.value);
  };

  const image2Handler = (e) => {
    e.preventDefault();
    setImage2(e.target.value);
  };

  const image3Handler = (e) => {
    e.preventDefault();
    setImage3(e.target.value);
  };

  const image4Handler = (e) => {
    e.preventDefault();
    setImage5(e.target.value);
  };

  const image5Handler = (e) => {
    e.preventDefault();
    setImage6(e.target.value);
  };

  const image6Handler = (e) => {
    e.preventDefault();
    setImage1(e.target.value);
  };

  const cookingtimeHandler = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };

  const flavorHandler = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };

  const ageHandler = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };

  const detailsHandler = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };
  let i = 1;
  const ImageComponent = (props) => {
    return(
      <div className="col-3">
        <label><b>상품 사진 + {i++}</b></label>
        <input
          type="file"
          mutilple ref = {'fileInput'+{i}}
        />
        {
          error.detailsError
            ?
            <div style={{
              color: "red",
              fontSize: "10px",
              margin: '-5px 0 10px 15px'
            }}>{error.phoneError}</div>
            :
            <div style={{
              color: "gray",
              fontSize: "10px",
              margin: '-5px 0 10px 15px'
            }}>{guideTxts.imageGuide}</div>
        }
      </div>

    )

  }
  const addImageHandler = (e) =>{
    e.preventDefault();
    let countArr = [...countList]
    let counter = countArr.slice(-1)[0]
    counter +=1
    countArr.push(counter)
    setCountList(countArr)


  }


    const handlePutUserLists = (e) => {
      e.preventDefault();

      let newArr = fileInput1.current.files;
      for(let i = 0; i < newArr.length ; i++){
        handleUpload(newArr[i]);
      }


      // if(!fileInput5.current.files[0].name) return null;

    };

    const handleUpload = (file1) => {
      let file2 = fileInput2.current.files[0];
      let file3 = fileInput3.current.files[0];
      newFileName1 = file1.name;
      newFileName2 = file2.name;
      newFileName3 = file3.name;



      const config = {
        bucketName: S3_BUCKET,
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
      };
      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(file1, newFileName1, file2, newFileName2, file3, newFileName3).then(data => {

        if(data.status === 204){
          console.log("success");
          alert("success")
        }else{
          console.log("fail");
        }
      });

      let body = {
        name: name,
        stock: stock,
        unitPrice: unitPrice,
        category: category,
        rating: rating,
        flavor: flavor,
        age: age,
        cookingtime: cookingtime,
        image1: newFileName1,
        image2: '',
        image3: '',
        image4: '',
        summaryImg: newFileName2,
        detailImg: newFileName3,
        details: details

      }

      console.log(body);

      axios.post(`/catalog-service/catalogs`, body)
        .then(res => {
          console.log(res)
          if (res.status == 201) {
            alert("상품 등록이 완료 되었습니다.");
            window.location.href = "/products/list#/products/list"
          } else {
            alert("다시 입력해주세요.");
          }
        })
        .catch(err => {
          alert("다시 다시 입력해주세요.");
          console.log(body);
        });



    }

    return (

        // <div className="card-body">
        //     <div className="myaccount-info-wrapper">
                <form onSubmit={handlePutUserLists} encType="multipart/form-data">
                  <div className="container">
                    <div className="row">
                        <div className="col-3">
                            {/*<div className="billing-info">*/}
                                <label><b>상품 이름</b></label><br/>
                                <TextField
                                  // type="text"
                                  id="outlined-basic"
                                  // label="상품 이름"
                                  value={name}
                                  onChange={nameHandler}
                                  placeholder="상품 이름을 입력하세요."
                                  variant="outlined"
                                />
                            {/*</div>*/}
                          {
                            error.nameError
                              ?
                              <div style={{
                                color: "red",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{error.userIdError}</div>
                              :
                              <div style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{guideTxts.userGuide}</div>
                          }
                            </div>



                        <div className="col-3">
                            {/*<div className="billing-info">*/}
                                <label><b>수량</b></label><br/>
                                <TextField
                                  type="text"
                                  id="outlined-basic"
                                  // label="수량"
                                  value={stock}
                                  onChange={stockHandler}
                                  placeholder="수량을 입력하세요."
                                  variant="outlined"
                                />
                            {/*</div>*/}
                          {
                            error.stockError
                              ?
                              <div style={{
                                color: "red",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{error.pwdError}</div>
                              :
                              <div style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{guideTxts.stockGuide}</div>
                          }

                        </div>


                        <div className="col-3">
                            {/*<div className="billing-info">*/}
                                <label><b>가격</b></label><br/>
                                <TextField
                                  type="text"
                                  id="outlined-basic"
                                  // label="가격"
                                  value={unitPrice}
                                  onChange={unitPriceHandler}
                                  placeholder="가격을 입력하세요."
                                  variant="outlined"
                                  />
                            {/*</div>*/}
                          {
                            error.priceError
                              ?
                              <div style={{
                                color: "red",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{error.confirmPwd}</div>
                              :
                              <div style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{guideTxts.priceGuide}</div>
                          }
                        </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row">
                        <div className="col-3">
                                <label><b>카테고리</b></label><br/>
                              <TextField
                                id="category"
                                select
                                // label="카테고리"
                                value={category}
                                onChange={categoryHandler}
                                helperText="카테고리를 선택해주세요."
                              >
                                  <MenuItem key="한식" value="1">  한식  </MenuItem>
                                  <MenuItem key="양식" value="2">  양식  </MenuItem>
                                  <MenuItem key="중식" value="3">  중식  </MenuItem>
                                  <MenuItem key="일식" value="4">  일식  </MenuItem>
                                  <MenuItem key="동남아 음식" value="5">  동남아 음식  </MenuItem>
                                  <MenuItem key="프리미엄" value="6">  프리미엄  </MenuItem>
                                  <MenuItem key="에어라인" value="7">  에어라인  </MenuItem>
                                  <MenuItem key="프리미엄" value="8">  프리미엄  </MenuItem>
                              </TextField>
                              {
                                error.authorError
                                  ?
                                  <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                  }}>{error.emailError}</div>
                                  :
                                  <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                  }}>{guideTxts.authorGuide}</div>
                              }
                            </div>
                        <div className="col-3">
                          <label><b>맛</b></label><br/>
                          <TextField
                            id="flavor"
                            select
                            // label="맛"
                            value={flavor}
                            onChange={flavorHandler}
                            helperText="맛을 선택해주세요."
                          >
                            <MenuItem key="한식" value="1">  짠맛  </MenuItem>
                            <MenuItem key="양식" value="2">  매운 맛  </MenuItem>
                            <MenuItem key="중식" value="3">  느끼한 맛  </MenuItem>
                            <MenuItem key="일식" value="4">  새콤한 맛  </MenuItem>
                          </TextField>
                          {
                            error.publisherError
                              ?
                              <div style={{
                                color: "red",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{error.nameError}</div>
                              :
                              <div style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{guideTxts.publisherGuide}</div>
                          }
                          </div>

                          <div className="col-3">
                            <label><b>선호되는 연령</b></label><br/>
                            <TextField
                              id="flavor"
                              select
                              // label="연령"
                              value={age}
                              onChange={ageHandler}
                              helperText="선호 연령대를 선택해주세요."
                            >
                              <MenuItem key="10대" value="10">  10 대  </MenuItem>
                              <MenuItem key="20대" value="20">  20 대  </MenuItem>
                              <MenuItem key="30대" value="30">  30 대  </MenuItem>
                              <MenuItem key="40대" value="40">  40 대  </MenuItem>
                            </TextField>
                          </div>
                        </div>
                      </div>


                  <div className="container">
                    <div className="row">
                      <div className="col-3">
                        <label><b>요리 시간</b></label><br/>
                        <TextField
                          id="flavor"
                          select
                          // label="요리시간"
                          value={cookingtime}
                          onChange={cookingtimeHandler}
                          helperText="선호 연령대를 선택해주세요."
                          >
                          <MenuItem key="1" value="1">10분 이내</MenuItem>
                          <MenuItem key="2" value="2">10분 ~ 20분</MenuItem>
                          <MenuItem key="3" value="3">20분 이상</MenuItem>
                        </TextField>
                      </div>

                        <div className="col-3">
                          <label><b>평점</b></label><br/>
                            <TextField
                              id="rating"
                              select
                              label="평점"
                              value={rating}
                              onChange={ratingHandler}
                              helperText="평점을 선택해주세요."
                            >
                              <MenuItem key="1" value="1">★</MenuItem>
                              <MenuItem key="2" value="2">★★</MenuItem>
                              <MenuItem key="3" value="3">★★★</MenuItem>
                              <MenuItem key="3" value="3">★★★★</MenuItem>
                            <MenuItem key="3" value="3">★★★★★</MenuItem>
                            </TextField>
                          </div>

                          <div className="col-3">
                            <label><b>설명</b></label><br/>
                            <TextField
                              id="outlined-multiline-static"
                              label="설명"
                              multiline
                              rows={4}
                              defaultValue="내용을 작성해주세요."
                            />
                          </div>
                        </div>
                    </div>

                    <div className="container">
                      <div className="row">
                        <div className="col-3">
                          <label><b>상품 사진 1</b></label>
                          <input
                              type="file"
                              mutilple ref = {fileInput1}
                          />
                          {
                            error.detailsError
                              ?
                              <div style={{
                                color: "red",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{error.phoneError}</div>
                              :
                              <div style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{guideTxts.imageGuide}</div>
                          }
                        </div>
                        {/*<ImageComponent countList={countList} />*/}
                        </div>
                    </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-3">
                          <label><b>상세이미지</b></label>
                          <input
                            type="file"
                            ref = {fileInput2}
                            name = "myFile"
                          />
                        {
                          error.detailsError
                            ?
                            <div style={{
                              color: "red",
                              fontSize: "10px",
                              margin: '-5px 0 10px 15px'
                            }}>{error.phoneError}</div>
                            :
                            <div style={{
                              color: "gray",
                              fontSize: "10px",
                              margin: '-5px 0 10px 15px'
                            }}>{guideTxts.imageGuide}</div>
                        }
                        </div>
                        <div className="col-3">
                          <label><b>제품설명표지</b></label>
                          <input
                            type="file"
                            ref = {fileInput3}
                            name = "myFile"
                          />
                          {
                            error.detailsError
                              ?
                              <div style={{
                                color: "red",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{error.phoneError}</div>
                              :
                              <div style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: '-5px 0 10px 15px'
                              }}>{guideTxts.imageGuide}</div>
                          }
                      </div>
                  </div>
                </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-3">
                            <button type="submit">등록</button>
                        </div>
                        <div className="col-3">
                          <button onClick={image1Handler}>상품 이미지 추가</button>
                        </div>

                      </div>
                    </div>
                </form>
        //     </div>
        // </div>
    );
}

