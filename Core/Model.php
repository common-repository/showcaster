<?php

namespace SHWPortfolioCatalog\Core;


abstract class Model
{

    protected $id;
    protected static $tableName;
    protected static $primaryKey = 'id_portfolio_catalog';
    protected static $dbFields = array();
    protected static $AllItemsCount;
    public function __construct($args = array())
    {
        if (empty(static::$tableName)) {
            throw new \Exception('"tableName" field cannot be empty for Model');
        }
        if (!empty($args)) {
            global $wpdb;
            $where = '';
            foreach ($args as $argKey => $argValue) {
                $where .= ($where === '' ? 'WHERE ' : ' AND ') . $argKey . '="' . $argValue . '"';
            }

            $r = $wpdb->get_row("SELECT * FROM `" . static::getTableName() . "` " . $where);
            if (!empty($r)) {
                $this->exists = true;
                $primaryKey = static::$primaryKey;
                $this->$primaryKey = $r->$primaryKey;
                if ($primaryKey === 'id_portfolio_catalog') {
                    $this->$primaryKey = (int)$this->$primaryKey;
                }
                foreach ($r as $paramName => $paramValue) {
                    $fName = 'set' . $paramName;
                    static::$dbFields[] = $paramName;
                    if (method_exists($this, $fName)) {
                        call_user_func(array($this, $fName), $paramValue);
                    }
                }
            }
        }
    }
    public static function getTableName()
    {
        global $wpdb;
        return $wpdb->prefix . static::$tableName;
    }

    protected function prepareSaveData($id = null, $preferredData = array())
    {
        $data = array();

        if (!empty($preferredData)) {
            foreach ($preferredData as $k => $v) {
                if ($v !== null) {
                    $data[$k] = $v;
                }
            }
            return $data;
        }

        if (empty(static::$dbFields)) {
            return $data;
        }

        foreach (static::$dbFields as $fieldName) {
            $fName = 'get' . $fieldName;

            if (method_exists($this, $fName)) {
                $value = call_user_func(array($this, $fName));
                if ($value !== null) {
                    $data[$fieldName] = $value;
                }
            }
        }

        if ($id !== null) {
            $data['id'] = $id;
        }

        return $data;
    }

    public function save($id = null)
    {
        global $wpdb;

        $key = static::$primaryKey;
        $data = $this->prepareSaveData($id);
        if (null === $this->$key) {
            $result = $wpdb->insert(static::getTableName(), $data);
        } else {
            $result = $wpdb->update(static::getTableName(), $data, array($key => $this->$key));
        }

        if (false !== $result) {
            if (null === $this->$key) {
                $this->$key = $wpdb->insert_id;

            }
            return $this->$key;
        }
        return false;
    }
    public static function delete($PrimaryKeyValue)
    {
        global $wpdb;

        if (static::$primaryKey === 'id_portfolio_catalog') {
            $def = $PrimaryKeyValue;
            $PrimaryKeyValue = absint($PrimaryKeyValue);

            if (!$PrimaryKeyValue || $PrimaryKeyValue != $def) {

                throw new \Exception('Parameter "Id" must be not negative integer.');

            }
        }

        return $wpdb->query("DELETE FROM " . static::getTableName() . " WHERE " . static::$primaryKey . " ='" . $PrimaryKeyValue . "'");
    }
    public static function get($args = array())
    {
        global $wpdb;
        $args = wp_parse_args($args, [
            'orderby' => 'id',
            'order' => 'ASC',
            'per_page' => false,
            'paged' => 1,
            'search' => false,
            'search_target' => 'name',
            'where' => array(),
            'where_operator' => 'AND',
        ]);
        $primaryKey = static::$primaryKey;
        $TableName = static::getTableName();

        /** Count all items */
        if (null !== static::$AllItemsCount) {
            $count = static::$AllItemsCount;
        } else {
            static::$AllItemsCount = $count = $wpdb->get_var("select count(*) from " . static::getTableName());
        }
        if ($count == 0) return array();
        $paginate = '';
        $where = '';

        /* Pagination */
        if (false !== $args['per_page']) {
            $num = $args['per_page'] == '' ? $count : $args['per_page'];
            $page = $args['paged'];
            $total = intval(($count - 1) / $num) + 1;
            $page = intval($page);
            if (empty($page) or $page <= 0) $page = 1;
            if ($page > $total) $page = $total;
            $start = $page * $num - $num;
            $paginate = " LIMIT $start, $num";
        }

        if (!empty($args['where'])) {
            $operator = !empty($args['where_operator']) ? $args['where_operator'] : 'AND';
            foreach ($args['where'] as $where_key => $where_value) {
                $where .= ($where === "" ? " WHERE " : " " . $operator . " ") . $where_key . "='" . $where_value . "'";
            }
        }

        /* Search */
        if ($args['search'] != "") {
            // First, escape the search string for use in a LIKE statement.
            $search = $wpdb->esc_like($args['search']);
            // Add wildcards, since we are searching within text.
            $search = '%' . $search . '%';
            if ($where === '') {
                $where = $wpdb->prepare(" WHERE %s LIKE %s", $args['search_target'], $search, $search);
            } else {
                $where .= $wpdb->prepare(" AND %s LIKE %s", $args['search_target'], $search, $search);
            }

        }

        $ordering = " ORDER BY " . $args['orderby'] . " " . $args['order'];

        $query = "SELECT " . $primaryKey . " FROM {$TableName}{$where}{$ordering}{$paginate}";

        $items = $wpdb->get_results($query, ARRAY_A);

        $ItemObjs = [];
        if (null !== $items) {
            foreach ($items as $item) {
                $ItemObjs[$item[$primaryKey]] = new static(array($primaryKey => $item[$primaryKey]));
            }
        }

        return $ItemObjs;
    }

    /**
     * @return int
     */
    public static function getAllItemsCount()
    {
        if (null === static::$AllItemsCount) {
            global $wpdb;
            static::$AllItemsCount = $wpdb->get_var("select count(*) from " . static::getTableName());
        }

        return static::$AllItemsCount;
    }
}