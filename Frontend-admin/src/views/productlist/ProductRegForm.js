import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import S3 from 'react-aws-s3';
import { CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup } from '@coreui/react';

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
  const [ loading, setLoading ] = useState();

  const [accessKey, setAccessKey] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');

  useEffect(()=>{
    axios.get(`/config-service/s3-accesskey/default`)
      .then((res) => {
        console.log(res.data.propertySources[0]);
        setAccessKey(res.data.propertySources[0].source.ACCESS_KEY);
        setSecretAccessKey(res.data.propertySources[0].source.SECRET_ACCESS_KEY);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

    const fileInput1 = useRef();
    const fileInput2 = useRef();
    const fileInput3 = useRef();


    const S3_BUCKET = 'tmax-2';
    const REGION = 'ap-northeast-2';

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
  };

  const stockHandler = (e) => {
    e.preventDefault();
    setStock(e.target.value);
  };

  const categoryHandler = (e) => {
    //e.preventDefault();
    // console.log(e.target.value);
    setCategory(e.target.value);
  };

  const cookingtimeHandler = (e) => {
    // e.preventDefault();
    setCookingtime(e.target.value);
  };

  const flavorHandler = (e) => {
    // e.preventDefault();
    setFlavor(e.target.value);
  };

  const ageHandler = (e) => {
    // e.preventDefault();
    setAge(e.target.value);
  };

  const detailsHandler = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };

  const productMainMultiFileChange = (e) => {
    e.preventDefault()
    console.log(e.target.files);
    // for(let i=0;i<e.target.files.length;i++) {
    //   console.log(e.target.files[i].name)
    // }
  }

  const productDetailFileChange = (e) => {
    e.preventDefault()
    console.log(e.target.files)
  }

  const productDetailFrontFileChange = (e) => {
    e.preventDefault()
    console.log(e.target.files)
  }


  const handlePutUserLists = (e) => {
    e.preventDefault();

    if(!name || name === '' || name.length > 20) {
      alert('20 글자 이하의 상품 명을 다시 입력해주세요.')
      return ;
    }
    if (!stock || stock === 0 || stock > 100) {
      alert('100 이하의 재고를 다시 입력해주세요.')
      return ;
    }

    if(!category || category === 0) {
      alert('카테고리를 다시 설정해주세요.')
      return ;
    }

    if(!flavor || flavor === 0) {
      alert('맛을 다시 설정해주세요.')
      return ;
    }

    if(!age || age === 0) {
      alert('선호 연령대를 다시 설정해주세요')
      return ;
    }

    if(!cookingtime || cookingtime === 0) {
      alert('요리 시간대를 다시 설정해주세요')
      return ;
    }

    if(!details || details === '') {
      alert('상품 상세 설명을 다시 작성해주세요')
      return ;
    }

    if (fileInput1.current.files.length === 0 || fileInput1.current.files.length > 4) {
      alert('상품 메인 이미지를 다시 삽입해주세요. 최대 갯수는 4개 입니다.')
      return ;
    }

    if (fileInput2.current.files.length === 0 || fileInput2.current.files.length >= 2) {
      alert('상품 상세 이미지를 다시 삽입해주세요. 최대 갯수는 1개 입니다.')
      return;
    }

    if (fileInput3.current.files.length === 0 || fileInput3.current.files.length >= 2) {
      alert('상품 설명 표지 이미지를 다시 삽입해주세요. 최대 갯수는 1개 입니다')
      return;
    }

    // s3 업로드 선 수행
    s3UploadHandler(fileInput1, fileInput2, fileInput3);
  };

  const s3UploadHandler = (fileInput1, fileInput2, fileInput3) => {
    setLoading(true)
    let s3File;
    let s3FileName;

    let body = new FormData();
    // 상품 메인 이미지 업로드
    let productMainFiles = fileInput1.current.files;
    // console.log(productMainFiles)

    for(let i=0;i<productMainFiles.length;i++) {
      s3File = productMainFiles[i];
      s3FileName = s3File.name;

      if(s3Uploader(s3File, s3FileName) === false) {
        setLoading(false)
        return;
      }
      // 폼 바디에 이미지 이름 추가
      body.append('image' + (i+1), s3FileName)
    }
    // 상품 상세 이미지 업로드
    let productDetailFile = fileInput2.current.files;
    // console.log(productDetailFile)

    s3File = productDetailFile[0];
    s3FileName = s3File.name;

    if(s3Uploader(s3File, s3FileName) === false) {
      setLoading(false)
      return;
    };
    // 폼 바디에 이미지 이름 추가
    body.append('detailImg', s3FileName)

    // 상품 설명 표지 이미지 업로드
    let productDetailFrontFile = fileInput3.current.files;
    // console.log(productDetailFrontFile)

    s3File = productDetailFrontFile[0];
    s3FileName = s3File.name;

    if(s3Uploader(s3File, s3FileName) === false) {
      setLoading(false)
      return;
    };
    // 폼 바디에 이미지 이름 추가
    body.append('summaryImg', s3FileName)

    // s3업로드가 끝나면 상품 등록
    submitHandler(body);

  }

  const s3Uploader = (s3File, s3FileName) => {
    // 이미지 업로드를 위한 초기 설정
    const config = {
      bucketName: S3_BUCKET,
      region: REGION,
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey
    };
    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(s3File, s3FileName)
      .then((data) => {
        if (data.status === 204) {
          console.log(s3FileName, 'upload success')
          return true;
        }
        else {
          console.log(s3FileName, 'upload fail')
          return false;
        }
      })
      .catch((err) => {
        console.log(err)
        return false;
      })

  }

  const submitHandler = (formData) => {

    for (let pair of formData.entries()) {
      console.log(pair[0] + ',' + pair[1])
    }

    let body = {
      name: name,
      stock: stock,
      category: category,
      rating: rating,
      flavor: flavor,
      age: age,
      cookingtime: cookingtime,
      image1: formData.get('image1') ? formData.get('image1') : '',
      image2: formData.get('image2') ? formData.get('image2') : '',
      image3: formData.get('image3') ? formData.get('image3') : '',
      image4: formData.get('image4') ? formData.get('image4') : '',
      summaryImg: formData.get('summaryImg') ? formData.get('summaryImg') : '',
      detailImg: formData.get('detailImg') ? formData.get('detailImg') : '',
      details: details
    }
    console.log(body)

    const token = window.localStorage.getItem('token')
    axios.post(`/catalog-service/catalogs`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          alert("상품 등록이 완료 되었습니다.");
          history.push({
            pathname: '/products/list'
          })
          setLoading(false)
        }
        else {
          alert("상품 등록에 실패했습니다. 다시 확인해보시고 등록 바랍니다.");
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        alert("상품 등록에 실패했습니다. 다시 확인해보시고 등록 바랍니다.");
        setLoading(false)
      });
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12 col-sm-12">
            <div className="product-register pt-20 pb-20">
              <h3>밀키트 상품 등록</h3>
            </div>
            <div className="product-card card p-4">
              <div className="card-body col-lg-12 col-sm-12">
                <div className="row">
                  <form onSubmit={handlePutUserLists} encType="multipart/form-data">
                    <CInputGroup className="mb-4 row">
                      <CFormLabel className="pl-0"><strong>상품 명</strong><span style={{ color: "red" }}>*</span></CFormLabel>
                      <CFormInput
                        placeholder="상품 이름을 입력하세요. (최대 20자)"
                        type="text"
                        value={name}
                        onChange={nameHandler} />
                    </CInputGroup>

                    <CInputGroup className="mb-4 row">
                      <CFormLabel className="pl-0"><strong>수량</strong><span style={{ color: "red" }}>*</span></CFormLabel>
                      <CFormInput
                        type="text"
                        value={stock}
                        onChange={stockHandler}
                        placeholder="수량을 입력하세요. (최대 100[개])" />
                    </CInputGroup>

                    <CInputGroup className="mb-4 row">
                      <CFormLabel className="pl-0"><strong>카테고리</strong><span style={{ color: "red" }}>*</span></CFormLabel>
                      <CFormSelect aria-label="Category Data"
                        value={category}
                        onChange={categoryHandler}
                      >
                        <option>카테고리를 선택해주세요.</option>
                        <option value="1">한식</option>
                        <option value="2">양식</option>
                        <option value="3">중식</option>
                        <option value="4">일식</option>
                        <option value="5">동남아 음식</option>
                        <option value="6">프리미엄</option>
                        <option value="7">에어라인</option>
                        <option value="8">프리미엄</option>
                      </CFormSelect>
                    </CInputGroup>

                    <CInputGroup className="mb-4 row">
                      <CFormLabel className="pl-0"><strong>맛</strong><span style={{ color: "red" }}>*</span></CFormLabel>
                      <CFormSelect aria-label="Flavor Data"
                        value={flavor}
                        onChange={flavorHandler}
                      >
                        <option>맛을 선택해주세요.</option>
                        <option value="1">짠 맛</option>
                        <option value="2">매운 맛</option>
                        <option value="4">느끼한 맛</option>
                        <option value="3">새콤한 맛</option>
                      </CFormSelect>
                    </CInputGroup>

                    <CInputGroup className="mb-4 row">
                      <CFormLabel className="pl-0"><strong>선호 연령대</strong><span style={{ color: "red" }}>*</span></CFormLabel>
                      <CFormSelect aria-label="Aging Data"
                        value={age}
                        onChange={ageHandler}
                      >
                        <option>선호 연령대를 선택해주세요.</option>
                        <option value="1">10 대</option>
                        <option value="2">20 대</option>
                        <option value="3">30 대</option>
                        <option value="4">40 대</option>
                      </CFormSelect>
                    </CInputGroup>

                    <CInputGroup className="mb-4 row">
                      <CFormLabel className="pl-0"><strong>요리 시간</strong><span style={{ color: "red" }}>*</span></CFormLabel>
                      <CFormSelect aria-label="Cooking Time Data"
                        value={cookingtime}
                        onChange={cookingtimeHandler}
                      >
                        <option>제품의 요리 시간대를 선택해주세요.</option>
                        <option value="1">10분 이내</option>
                        <option value="2">10분 ~ 20분</option>
                        <option value="3">20분 이상</option>
                      </CFormSelect>
                    </CInputGroup>

                    <input type="hidden"
                      value={rating}
                      name="rating"
                    >
                    </input>

                    <CInputGroup className="mb-3 row">
                      <CFormLabel className="pl-0"><strong>상세 설명</strong><span style={{color:"red"}}>*</span></CFormLabel>
                      <CFormTextarea
                        id="productDetailTextArea"
                        rows="10"
                        value={details}
                        onChange={detailsHandler}
                        ></CFormTextarea>
                    </CInputGroup>

                    <CInputGroup className="mb-3 row">
                      <CFormLabel className="pl-0" htmlFor="formFileMultiple"><strong>상품 메인 이미지</strong><span style={{ color: "red" }}>*</span> (최대 4개까지 등록 가능합니다.)</CFormLabel>
                      <CFormInput type="file" id="formFileMultiple" ref={fileInput1} onChange={productMainMultiFileChange}
                        accept='image/jpg,impge/png,image/jpeg,image/gif' multiple />
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

                    </CInputGroup>

                    <CInputGroup className="mb-3 row">
                      <CFormLabel className="pl-0" htmlFor="formFile"><strong>상품 상세 이미지</strong><span style={{ color: "red" }}>*</span> (최대 1개까지 등록 가능합니다.)</CFormLabel>
                      <CFormInput type="file" id="formFile" ref={fileInput2} onChange={productDetailFileChange}
                        accept='image/jpg,impge/png,image/jpeg,image/gif' />

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
                    </CInputGroup>

                    <CInputGroup className="mb-3 row">
                      <CFormLabel className="pl-0" htmlFor="formFile"><strong>상품 설명 표지 이미지</strong><span style={{ color: "red" }}>*</span> (최대 1개까지 등록 가능합니다.)</CFormLabel>
                      <CFormInput type="file" id="formFile" ref={fileInput3} onChange={productDetailFrontFileChange}
                        accept='image/jpg,impge/png,image/jpeg,image/gif' />
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
                    </CInputGroup>

                    <div className="register-button row">
                      <div className="col-10 col-lg-10 col-sm-10"></div>
                      <div className="col-2 col-lg-2 col-sm-2">
                        <button type="submit" className="btn btn-primary">
                          {
                            loading === false ? '등록' : '처리중..'
                          }
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

