<div class="modal shwc_modal_page" index="">
    <div class="modal_content">
        <div class="images_block">
            <div class="main_image_block">
            </div>
            <div class="thumbs_list_wrap">
                <ul class="thumbs_list">
                </ul>
                <ul class="thumbs_nav_list">
                </ul>
            </div>
        </div>

        <div class="info_block" id="infoBlock">
            <span class="product_heading"> </span>
            <div class="info_flex_wrapper">
                <div class="product_description">
                    <span class="info_label">Description</span>
                    <p class="description_content">
                    </p>
                </div>
                <div class="product_price">
                    <span class="info_label">Price</span>
                    <span class="old_price">
                        <span class="old_price_inner"></span>
                    </span>
                    <span class="discount_price"></span>
                </div>
                    <div class="product_categories">
                        <span class="info_label">Categories</span>
                        <ul class="categories_list">
                        </ul>
                    </div>
                    <div class="attributes_block">
                        <span class="info_label">Attributes</span>
                        <ul class="attributes_list">
                            <!--
                            <?php for ( $i = 0; $i < 3; $i++ ) {
                                ?>
                                <li>
                                    <span class="attr_label">Attribute :  Attribute Value</span>
                                </li>
                            <?php } ?>
                            -->
                        </ul>
                    </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="close_modal_wrapper">
        <span class="shwc_info_menu">...</span>
        <a href="javascript:;" class="close_modal" url = "<?= $path ?>">

            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g>
                    <g>
                        <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249
                            C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306
                            C514.019,27.23,514.019,14.135,505.943,6.058z"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636
				c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/>
                    </g>
                </g>
            </svg>
        </a>
    </div>

    <a href="javascript:;" class="prev_modal_button" onclick="goToNextSlideModal(this)">
        <svg class="prev_modal_svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve"  width="50" height="50">
        <g>
            <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
        </g>
        </svg>

        <svg class="mobile_prev_modal_svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 31.494 31.494"  xml:space="preserve">
            <path  d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
                c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
                c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
        </svg>
    </a>

    <a href="javascript:;" class="next_modal_button" onclick="goToNextSlideModal(this, true)">
        <svg class="next_modal_svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve"  width="50" height="50">
            <g>
                <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
                    "/>
            </g>
        </svg>

        <svg class="mobile_next_modal_svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 31.49 31.49"  xml:space="preserve">
        <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
            C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
            c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
        </svg>
    </a>
</div>