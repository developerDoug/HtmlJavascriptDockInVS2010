<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="RightNavSample.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="/Styles/base.css" rel="stylesheet" type="text/css" />
    <link href="/Styles/ui-lightness/jquery-ui-1.8.13.custom.css" rel="stylesheet" type="text/css" />
    <script src="/Scripts/jquery-1.5.1.min.js" type="text/javascript"></script>
    <script src="/Scripts/jquery-ui-1.8.13.custom.min.js" type="text/javascript"></script>
    <script src="/Scripts/default.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        
        <!--
        <div id="my-left-dock" class="dock-left" style="z-index:2;">
            <div class="dock-tab-title-container">
                <div id="dock_title_left_arrow" class="dock-tab-title">
                    <div style="padding:5px 0px 5px 0px;">
                        <img id="dock_title_left_arrow_image" src="/Images/Icons/arrow-left.png" alt="" />
                    </div>
                </div>
                <div id="test1_dock_left_title" class="dock-tab-title" data-tab-index="1" data-dock-type="left">
                    <div style="padding:10px;">1</div>
                </div>
                <div id="test2_dock_left_title" class="dock-tab-title" data-tab-index="2" data-dock-type="left">
                    <div style="padding:10px;">2</div>
                </div>
                <div id="test3_dock_left_title" class="dock-tab-title" data-tab-index="3" data-dock-type="left">
                    <div style="padding:10px;">3</div>
                </div>
            </div>
            <div class="dock-pointer-container">
                <div class="dock-pointer-arrow"></div>
            </div>
            <div class="dock-tab-window-container">
                <div id="tab1_dock_left_tab_window" class="dock-tab-window" style="display:none;">
                    <div style="padding:10px;">
                        stuff inside here. tab 1
                    </div>
                </div>
                <div id="tab2_dock_left_tab_window" class="dock-tab-window" style="display:none;">
                    <div style="padding:10px;">
                        stuff inside here. tab 2.
                    </div>
                </div>
                <div id="tab3_dock_left_tab_window" class="dock-tab-window" style="display:none;">
                    <div style="padding:10px;">
                        stuff inside here. tab 3.
                    </div>
                </div>
            </div>
            <div class="dock-dragger ui-widget-content"></div>
        </div>
        -->

        <div class="content">
            testing
        </div>

        <div style="border:1px solid red; width:400px; height:100px;">
            hey
        </div>

        <div id="my-right-dock" class="dock-right">
            <div id="dock_right_dragger" class="dock-dragger ui-widget-content"></div>
            <div class="dock-tab-title-container">
                <div id="dock_title_right_arrow" class="dock-tab-title" data-dock-type="right">
                    <div style="padding:5px 0px 5px 0px;">
                        <img id="dock_title_right_arrow_image" src="/Images/Icons/arrow-left.png" alt="" />
                    </div>
                </div>
                <div id="test1_dock_right_title" class="dock-tab-title" data-tab-index="1" data-dock-type="right">
                    <div style="padding:10px;">1</div>
                </div>
                <div id="test2_dock_right_title" class="dock-tab-title" data-tab-index="2" data-dock-type="right">
                    <div style="padding:10px;">2</div>
                </div>
                <div id="test3_dock_right_title" class="dock-tab-title" data-tab-index="3" data-dock-type="right">
                    <div style="padding:10px;">3</div>
                </div>
            </div>
            <div class="dock-pointer-container">
                <div class="dock-pointer-arrow"></div>
            </div>
            <div class="dock-tab-window-container">
                <div id="tab1_dock_right_tab_window" class="dock-tab-window" style="display:none;" data-dock-type="left">
                    <div style="padding:10px;">
                        stuff inside here. tab 1
                    </div>
                </div>
                <div id="tab2_dock_right_tab_window" class="dock-tab-window" style="display:none;" data-dock-type="left">
                    <div style="padding:10px;">
                        stuff inside here. tab 2.
                    </div>
                </div>
                <div id="tab3_dock_right_tab_window" class="dock-tab-window" style="display:none;" data-dock-type="left">
                    <div style="padding:10px;">
                        stuff inside here. tab 3.
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
