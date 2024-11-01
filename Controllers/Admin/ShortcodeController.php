<?php

namespace SHWPortfolioCatalog\Controllers\Admin;

use SHWPortfolioCatalog\Helpers\View;

class ShortcodeController
{

	public static function showInlinePopup_()
	{
		View::render('admin/inline-popup.php');
	}

	public static function showEditorMediaButton_($context)
	{
		$img = untrailingslashit(\SHWPortfolioCatalog()->pluginUrl()) . "/resources/assets/images/icons/logo.icon.png";
		$container_id = 'shwcatalog';
		$title = __('Showcaster Shortcode', SHWPORTFOLIOCATALOG_TEXT_DOMAIN);
		$button_text = __('Showcaster', SHWPORTFOLIOCATALOG_TEXT_DOMAIN);
		$context .= '<a class="button thickbox" title="' . $title . '"    href="#TB_inline?width=400&inlineId=' . $container_id . '">
		<span class="wp-media-buttons-icon" style="background: url(' . $img . '); background-repeat: no-repeat; background-position: left bottom;background-size: 18px 18px;"></span>' . $button_text . '</a>';

		return $context;
	}

}