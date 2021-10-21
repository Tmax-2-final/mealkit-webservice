package com.example.alertservice.transformer;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class Trans {
	
	public static String default_msg_param = ""
    		+ "template_object={\n"
    		+ "        \"object_type\": \"feed\",\n"
    		+ "        \"content\": {\n"
    		+ "            \"title\": \"피드 메시지\",\n"
    		+ "            \"description\": \"피드 메시지 기본 템플릿\",\n"
    		+ "            \"image_url\": \"http://api1-kage.kakao.com/dn/cerDB5/ZSb2iRugKx/M4nuZxX823tnK1Mk5yVcv0/kakaolink40_original.png\",\n"
    		+ "            \"link\": {\n"
    		+ "                \"web_url\": \"http://daum.net\",\n"
    		+ "                \"mobile_web_url\": \"http://dev.kakao.com\"\n"
    		+ "            }\n"
    		+ "        },\n"
    		+ "        \"social\": {\n"
    		+ "            \"like_count\": 100,\n"
    		+ "            \"comment_count\": 200\n"
    		+ "        },\n"
    		+ "        \"button_title\": \"바로 확인\"\n"
    		+ "    }"
    		+ "";

	public static String template_args = ""
			+ "{\n"
			+ "\"userId\": \"zxcv9455\", \n"
			+ "\"productName\": \"핫바\" \n"
			+ "}"
			+ "";

	public static String template_args2(String userId, String subscribeName, Integer subscribeQty) {
		String s = ""
				+ "{\n"
				+ "\"userId\": \""+ userId +"\", \n"
				+ "\"subscribeName\": \""+ subscribeName + "\", \n"
				+ "\"subscribeQty\": "+subscribeQty+ " \n"
				+ "}"
				+ "";
		return s;
	}

	
    public static String token(String rtn, JsonParser parser) {
        JsonElement element = parser.parse(rtn);       
        return element.getAsJsonObject().get("access_token").getAsString();

    }
    
    
}
