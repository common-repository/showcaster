import React, {Component} from "react";
import Grid from "./../../templates/grid";
import Slider from "./../../templates/slider";
import Pinterest from "./../../templates/pinterest";
import Template4 from "./../../templates/template4";
import Masonry from "./../../templates/masonry";
import FullWidth from "./../../templates/fullwidth";
import  '../../../../../assets/css/frontend/main.css';
import Popup from "./popup";
class PreviewPanel extends Component {
    constructor(props) {
        super(props);
        this.selectedView = null;
        this.imageData = [{
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_2/house_2_1.jpg',
                productTitle: 'Luxury Villa Close to Beach',
                productDescription: 'Forget the stress of the daily life in the typical Balinese setting of this spacious villa with exceptional amenities. Elegantly decorated and fully equipped, it also enjoys a privileged location in Bali.',
                productPrice: '$600',
                productDiscount: '$450 per night',
                date:'2018-07-16 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "5"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "7"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_2/house_2_2.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_2/house_2_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_2/house_2_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_2/house_2_5.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_2/house_2_6.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_2/house_2_7.jpg']
             },  {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525446857/house_1/house_1_1.jpg',
                productTitle: 'Laze at Infinity Pool from Villa in Peace and Quiet',
                productDescription: 'View the horizon from the private infinity pool at this exotic Terrace villa with holiday feel. The well equipped living space features a kitchen, gas fireplace, and a spacious jetted tub. Fabulous indoor/outdoor living . DSTV. Free Wi-Fi. BBQ. Deck.',
                productPrice: '$680',
                productDiscount: '$600 per night',
                date: '2018-07-20 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "4"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "1"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525446857/house_1/house_1_2.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525446857/house_1/house_1_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525446857/house_1/house_1_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525446857/house_1/house_1_5.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525446857/house_1/house_1_6.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525446857/house_1/house_1_7.jpg']
            }, {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_3/house_3_1.jpg',
                productTitle: 'Modernist Urban Retreat in Venice Beach',
                productDescription: 'Escape to the heart of Venice Beach in this bright, open home with two floors, a wall of windows, and a private patio with a BBQ. Curl up by the fireplace in the tranquil common room on the second floor, or whip up a meal in the spacious kitchen.',
                productPrice: '$920',
                productDiscount: '$850 per night',
                date: '2018-07-15 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "1"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "1"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_3/house_3_2.jpg',
                'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_3/house_3_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_3/house_3_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_3/house_3_5.jpg',
                'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_3/house_3_6.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_3/house_3_7.jpg']
             }, {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_4/house_4_1.jpg',
                productTitle: 'Five Bedroom House with a Resort Style Backyard',
                productDescription: 'lay on a backyard putting green, in a swimming pool, or on a billiard table. The whole family will enjoy the fun options contained in this resort-like home. There are bunk beds for the kids and a full kitchen with a six-burner gas stove.',
                productPrice: '$600',
                productDiscount: '$530 per night',
                date: '2018-07-14 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "6"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "5"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_4/house_4_2.jpg',
                    'http://res.cloudinary.com/dcry7jsy4/image/upload/v1525447195/house_4/house_4_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_4/house_4_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_4/house_4_5.jpg',
                    'http://res.cloudinary.com/dcry7jsy4/image/upload/v1525447195/house_4/house_4_6.jpg', 'http://res.cloudinary.com/dcry7jsy4/image/upload/v1525447195/house_4/house_4_7.jpg']
            }, {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_5/house_5_1.jpg',
                productTitle: 'Amazing Penthouse In The Sky 4 Bedrooms Sleep 10',
                productDescription: 'Penthouse in the sky, Large 4 Bedrooms in the heart of Manhattan. Absolutely stunning full floor with tremendous NYC skyline view!! Enjoy NYC from this immaculately kept, 2000 sq ft full floor 4 bed, 2 bath residence located in Midtown Manhattan. Step off the private keyed elevator into your newly renovated home, air conditioning and hardwood floors throughout',
                productPrice: '€450',
                productDiscount: '€420 per night',
                date: '2018-07-01 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "6"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "1"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_5/house_5_2.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525447218/house_5/house_5_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_5/house_5_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_5/house_5_5.jpg',
                    ]
            }, {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_6/house_6_1.jpg',
                productTitle: 'Minimalist Loft Luxury in Soho',
                productDescription: 'Our apartment features washer/dryer in unit, plank hardwood flooring, a brand new kitchen with all custom cabinetry and condo like finishes including a dishwasher, spacious living room, multiple closets throughout, newly renovated bathrooms and windows in every room allow for endless sunshine. The apartment is in a pristine newly renovated pre-war building situated on a quiet and peaceful residential street in the heart of Chelsea. Just steps from Chelsea Market, The Highline and Chelsea Piers.',
                productPrice: '$500',
                productDiscount: '$450 per night',
                date: '2018-08-20 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "10"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "4"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "7"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_6/house_6_2.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525447245/house_6/house_6_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_6/house_6_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_6/house_6_5.jpg',
                    'http://res.cloudinary.com/dcry7jsy4/image/upload/v1525447246/house_6/house_6_6.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_6/house_6_7.jpg']
            },
            {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_7/house_7_1.jpg',
                productTitle: 'Luxurious Resort Living House with Ocean Front Heated Pool',
                productDescription: 'Dine, relax, and lay down for bed or to tan with views of the ocean in this luxurious resort retreat. There\'s a heated, private swimming pool, spa, and a cabana with an outdoor kitchen BBQ and shower—ideal for relaxing or entertaining fellow guests',
                productPrice: '$700',
                productDiscount: '$590 per night',
                date: '2018-08-08 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "5"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "4"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_7/house_7_2.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_7/house_7_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_7/house_7_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_7/house_7_5.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_7/house_7_6.jpg']
            },
            {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_8/house_8_1.jpg',
                productTitle: 'Midcentury Modern House near Lake Travis',
                productDescription: 'Roll up bamboo blinds first thing in the morning for a day of relaxing indoor-outdoor tropical living. Work up an appetite with a few lengths in the pool, dine al fresco at a table for eight, and doze off while swaying gently in a hanging chair.',
                productPrice: '£250',
                productDiscount: '£200 per night',
                date: '2018-08-05 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "6"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "4"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "1"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_8/house_8_2.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_8/house_8_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_8/house_8_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_8/house_8_5.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_8/house_8_6.jpg']
            }, {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_9/house_9_1.jpg',
                productTitle: 'Hollywood Hills Villa with Breathtaking Views',
                productDescription: 'Admire the sweeping vistas from the wraparound balcony of this elegant home perched high above the city. Indulge in all the luxuries this spacious modern home offers: a chef’s kitchen, hot tub, and floor-to-ceiling sliding doors for more views.',
                productPrice: '$400',
                productDiscount: '$350 per night',
                date: '2018-08-10 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "4"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_9/house_9_2.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_9/house_9_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_9/house_9_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_9/house_9_5.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_9/house_9_6.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_9/house_9_7.jpg']
            }, {
                name: 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_10/house_10_1.jpg',
                productTitle: 'Bright, Cheerful, and Cozy Craftsman House',
                productDescription: 'Admire quintessential 1920s Craftsman architecture in this bright, cozy, family friendly home. Cook the perfect meal in the fully stocked kitchen and sit down and relax in the spacious dining room, kitchen nook, or two outdoor patios.',
                productPrice: '$260',
                productDiscount: '$180 per night',
                date: '2018-08-06 20:44:28',
                productShowAttributes: "on",
                attributes: [{
                    is_visible: "on",
                    title: "Guests",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Bedrooms",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Beds",
                    value: "3"
                }, {
                    is_visible: "on",
                    title: "Baths",
                    value: "2"
                }, {
                    is_visible: "on",
                    title: "Cable TV",
                    value: "YES"
                }, {
                    is_visible: "on",
                    title: "Wifi",
                    value: "YES"
                }],
                thumbnails: ['https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_10/house_10_2.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525447472/house_10/house_10_3.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_10/house_10_4.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525447472/house_10/house_10_5.jpg',
                    'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525447472/house_10/house_10_6.jpg', 'https://res.cloudinary.com/dcry7jsy4/image/upload/v1525960477/house_10/house_10_7.jpg']
        }];
        this.state = {
            data: null
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({data: newProps.receivedData}, function() {
            if (newProps.receivedData.view == 2) {
                updateSlick();
            } else {
                var isotopeObject = {
                    itemSelector: '.shwcgrid-item',
                    getSortData: {
                        productTitle: '.productTitle',
                        number: '.number parseInt',
                        date: function ($elem) {
                            return jQuery($elem).find('.date').text();
                        }
                    }
                };
                if (newProps.receivedData.view == 5) {
                    isotopeObject.layoutMode = 'masonry';
                }

                var $grid = jQuery('.shwcgrid');
                $grid.imagesLoaded(function () {
                    var $container = $grid.isotope(isotopeObject);
                    var iso = $container.data('isotope');
                    $container.find(".hidden").removeClass("hidden");
                    var hiddenElems = iso.filteredItems.slice(newProps.receivedData.loadMoreDefaultImagesCount, iso.filteredItems.length).map(function(item) {
                        return item.element;
                    });
                    $(hiddenElems).addClass('hidden');
                    $container.isotope('layout');
                });
                if (newProps.receivedData.view == 1) {
                    if (this.selectedView != newProps.receivedData.view) {
                        constructCarusel();
                        updateControls();
                    }
                }
                if(this.selectedView && this.selectedView != newProps.receivedData.view) {
                     constructFilter(newProps.receivedData.view);
                }

            }
            this.selectedView = newProps.receivedData.view;
        });
    }
    section(view) {
        this.openOptions(view);
        switch (view) {
            case "1":
                let buttonPosition = this.state.data.categoryButtonsPositionBtn;
                let searchFieldPosition = this.state.data.searchFieldPosition;
                return <Grid datas = {this.props.receivedData } imageData = {this.imageData} buttonPosition={buttonPosition} searchFieldPosition={searchFieldPosition}/>;
                break;
            case "2":
                return <Slider datas = {this.props.receivedData } imageData = {this.imageData} buttonPosition={buttonPosition} searchFieldPosition={searchFieldPosition}/>;
                break;
            case "3":
                return <Pinterest datas = {this.props.receivedData } imageData = {this.imageData} buttonPosition={buttonPosition} searchFieldPosition={searchFieldPosition} />;
                break;
            case "4" :
                return <Template4 datas = {this.props.receivedData } imageData = {this.imageData} buttonPosition={buttonPosition} searchFieldPosition={searchFieldPosition} />;
                break;
            case"5":
                return <Masonry datas = {this.props.receivedData } imageData = {this.imageData} buttonPosition={buttonPosition} searchFieldPosition={searchFieldPosition} />;
            case "6":
                return <FullWidth datas = {this.props.receivedData } imageData = {this.imageData} buttonPosition={buttonPosition} searchFieldPosition={searchFieldPosition} />;
                break;
            default:
                return <Grid datas = {this.props.receivedData } imageData = {this.imageData} buttonPosition={buttonPosition} searchFieldPosition={searchFieldPosition} />;
        }
    }

    openOptions(view) {
        let shwtheme_options_list = document.getElementById('shwtheme_options_list');
        shwtheme_options_list = shwtheme_options_list.getElementsByTagName('li');
        for (let i = 0; i < shwtheme_options_list.length; ++i) {
            if (view == 2) {
                if (i == 5 || i == 6 || i == 7 || i == 8) {
                    shwtheme_options_list[i].style.display = "none";
                }
                if (i == 1) {
                    shwtheme_options_list[i].style.display = "block";
                }
                if (i == 2) {
                    shwtheme_options_list[i].firstElementChild.innerText = "Slider Item";
                }
            } else if (i == 1) {
                shwtheme_options_list[i].style.display = "none";
            } else if (i == 2) {
                shwtheme_options_list[i].firstElementChild.innerText = "Grid Item";
            }
            else {
                shwtheme_options_list[i].style.display = "block";
            }
        }
    }

    render() {
        let view = this.state.data ? this.state.data.view : 1;
        let popup;
        if (this.imageData) {
            popup = <Popup datas = {this.props.receivedData } imageData = {this.imageData}/>;
        }
        return (
            <div>
                { this.section(view) }
                <div> {popup}</div>
            </div>)
    }
}
export default PreviewPanel;