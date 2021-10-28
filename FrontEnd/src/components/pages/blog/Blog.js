import Title from '../../elements/ui/Title';
import Bloglist from '../../elements/widgets/bloglist/Bloglist';

export default function Blog(){
    return (
        <section id="blog">
            <div className="container">
                <Title 
                    title = "월간 추천 패키지"
                    subtitle= "회원들이 만든 정기 구독 패키지에요."/>
                <Bloglist />
            </div>
        </section> 

    );
}