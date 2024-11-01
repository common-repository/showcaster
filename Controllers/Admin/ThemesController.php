<?php

namespace SHWPortfolioCatalog\Controllers\Admin;

use SHWPortfolioCatalog\Helpers\View;
use SHWPortfolioCatalog\Models\Themes;

class ThemesController
{
	public function __construct()
	{

		$this->loadPage();

	}

	public function loadPage()
	{
		View::render('admin/header-banner.php', ["key"]);

		if (!isset($_GET['task'])) {
			$theme = new Themes();
			$allThemes = $theme->getAllThemes();
			if (!empty($allThemes)) {

				$id_ = isset($allThemes->id) ? $allThemes->id : 1;

				$theme = new Themes(array('id' => $id_));
				$optionData = $theme->getOptionsObject();
				View::render('admin/themes/edit-theme.php', array('theme' => $theme, 'optionData'=>$optionData));
			}
		} else {
			$task = $_GET['task'];
			switch ($task) {
				case 'edit_theme':
					if (!isset($_GET['id'])) {
						\SHWPortfolioCatalog()->admin->printError(__('Missing "id" parameter.', SHWPORTFOLIOCATALOG_TEXT_DOMAIN));
					}

					$id = absint($_GET['id']);
					if (!$id) {
						\SHWPortfolioCatalog()->admin->printError(__('"id" parameter must be not negative integer.', SHWPORTFOLIOCATALOG_TEXT_DOMAIN));
					}
					$theme = new Themes(array('id' => $id));
					$optionData = $theme->getOptionsObject();
					View::render('admin/themes/edit-theme.php', array('theme' => $theme, 'optionData'=>$optionData));
					break;
			}
		}
	}
}