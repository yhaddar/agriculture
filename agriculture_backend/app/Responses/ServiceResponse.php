<?php
namespace App\Responses;

class ServiceResponse {
    private $data;
    private $total;
    private $last_page;
    private $current_page;
    private $category;

    /**
     * @return mixed
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param mixed $category
     */
    public function setCategory($category): void
    {
        $this->category = $category;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $data
     */
    public function setData($data): void
    {
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function getTotal()
    {
        return $this->total;
    }

    /**
     * @param mixed $total
     */
    public function setTotal($total): void
    {
        $this->total = $total;
    }

    /**
     * @return mixed
     */
    public function getLastPage()
    {
        return $this->last_page;
    }

    /**
     * @param mixed $last_page
     */
    public function setLastPage($last_page): void
    {
        $this->last_page = $last_page;
    }

    /**
     * @return mixed
     */
    public function getCurrentPage()
    {
        return $this->current_page;
    }

    /**
     * @param mixed $current_page
     */
    public function setCurrentPage($current_page): void
    {
        $this->current_page = $current_page;
    }



}
