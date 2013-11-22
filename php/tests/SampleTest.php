<?php
class SampleTest extends PHPUnit_Framework_TestCase
{
    public function testAdd()
    {
        $sample = new Sample();
        $this->assertEquals(3, $sample->add(1, 2));
    }
}
