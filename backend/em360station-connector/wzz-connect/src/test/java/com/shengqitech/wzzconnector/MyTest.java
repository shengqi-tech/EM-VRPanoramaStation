package com.shengqitech.wzzconnector;

import com.shengqitech.common.http.RestClient;
import junit.framework.TestSuite;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Unit test for simple App.
 */
@SpringBootTest(classes = WzzConnectorApplication.class)
@RunWith(SpringRunner.class)
public class MyTest{

    @Autowired
    RestClient restClient;

    @Test
    public void test(){
        System.out.println(restClient);
    }

}
