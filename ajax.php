<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/* TOK */
class Ajax extends MY_Controller
{
    function __construct()
    {
        parent::__construct();
        //authorization level
        $this->level = $this->config->item('level');
        $this->newsletter = $this->config->item('newsletter');
        //șablon pentru motive juridice
        $this->titles = $this->config->item('titles');
        //șablon pentru dosarele cu date personale
        $this->personaldatatype = $this->config->item('personaldatatype');
        //șabloane pentru baza juridică de gestionare a datelor
        $this->specialdatatype = $this->config->item('specialdatatype');


    }

    public function index()
    {
        redirect('/');
    }


   //șterge conținutul
    public function delContent()
    {
        if ($this->input->post('id')) {
            $this->db->where('id', $this->input->post('id'));
            $this->db->delete('content');
            echo '1';
        }
    }

    //sterge psachet
    public function delPackage()
    {
        if ($this->input->post('id')) {
            $this->db->where('id', $this->input->post('id'));
            $this->db->delete('packages');
            echo '1';
        }
    }

    //settlement recommendation
    function searchcity()
    {
        if ($this->input->post('c')) {
            $this->db->where('zipcode', trim(xss_clean($this->input->post('c'))));
            $q = $this->db->get('zipcode');
            if ($q->num_rows() == 1) {
                $row = $q->row();
                echo $row->settlement;
            }
        }
    }

    //language settings
    function setLang()
    {
        $langcookie_life = time() + 60 * 60 * 24 * 60;

        // nyelv beállítása választás alapján
        $languages = $this->config->item('languages');

        if ($this->input->post('lang')) {
            unset($_COOKIE['actlang']);
            setcookie('actlang', '', time() - 3600, '/');
            $slang = $this->input->post('lang');
            if (array_key_exists($slang, $languages)) {
                setcookie('actlang', $slang, $langcookie_life, '/');
            }
            echo '1';
        }
    }

    //Sign up for newsletter
    function newsletterSubscribe()
    {

        if ($this->input->post('privacy') and $this->input->post('privacy') == '1') {

            $this->form_validation->set_rules('email', $this->lm->t('manager_email'), 'trim|strip_tags|required|xss_clean|valid_email|is_unique[' . $this->db->dbprefix('newsletter') . '.email]');
            $this->form_validation->set_rules('first', $this->lm->t('manager_name_first'), 'trim|strip_tags|required|xss_clean');
            $this->form_validation->set_rules('last', $this->lm->t('manager_name_last'), 'trim|strip_tags|required|xss_clean');


            if ($this->form_validation->run() == FALSE) {
                echo str_replace('</p>', "\r\n", str_replace('<p>', '', validation_errors()));
            } else {
                $data = array(
                    'firstname' => $this->input->post('first'),
                    'lastname' => $this->input->post('last'),
                    'email' => $this->input->post('email'),
                    'date' => date('Y-m-d H:i:s'),
                    'ip' => $_SERVER['REMOTE_ADDR']
                );

                $this->db->insert('newsletter', $data);
                echo '1';
            }
        } else {
            echo $this->lm->t('error_unknown');
        }
    }

    //Adăugați un pachet de înregistrare în grup
    function groupPackageAdd()
    {
        if (!$this->session->userdata('cart')) {
            echo $this->lm->t('error_orgs_data_empty');
        } else {
            $h = 0;
            $cart = $this->session->userdata('cart');
//all the data is loaded for the order
            foreach ($cart as $c) {

                if ($c['name'] == '' or $c['tax_number'] == '' or $c['contact_person'] == '' or $c['contact_phone'] == '' or $c['email'] == '' or $c['email'] == '' or $c['billing_zip'] == '' or $c['billing_street_name'] == '' or $c['billing_city'] == '') {
                    $h = 1;
                }
            }

//all forms are filled
            if ($this->session->userdata('packform') and ($this->session->userdata('packform') != count($this->session->userdata('cart')))) {
                $h = 1;
            }


            if ($h == 1) {
                echo $this->lm->t('error_data_empty');
            } else {
                $num = count($this->session->userdata('cart')) + 1;

                $div = '<div class="ui-g">
                        <div class="ui-g-6">
                        <p><b>' . ($num - 1) . '. Detalii sub-organizatie (membru de grup)</b></p>
                        <input type="text" name="OrganizationName-' . $num . '" id="OrganizationName-' . $num . '" class="ui-inputfield"
       placeholder="Nume sub-organizației">
       <input type="text" name="OrganizationEmail-' . $num . '" id="OrganizationEmail-' . $num . '" class="ui-inputfield"
       placeholder="Email sub-organizatie">
       <input type="text" name="OrganizationZip-' . $num . '" id="OrganizationZip-' . $num . '" class="ui-inputfield"
       placeholder="(ZIP) Cod postal">
       <input type="text" name="OrganizationSettlement-' . $num . '" id="OrganizationSettlement-' . $num . '"
       class="ui-inputfield" placeholder="Oras / Localitate">
       <input type="text" name="OrganizationAddress-' . $num . '" id="OrganizationAddress-' . $num . '" class="ui-inputfield"
       placeholder="Adresa">
       <input type="text" name="OrganizationTaxnumber-' . $num . '" id="OrganizationTaxnumber-' . $num . '"
       class="ui-inputfield" placeholder="(CIF) Cod fiscal">
       </div>
       <div class="ui-g-6">
       <p><b>' . ($num - 1) . '. Detaliile de contact ale sub-organizatiei</b></p>
       <input type="text" name="OrganizationContact-' . $num . '" id="OrganizationContact-' . $num . '" class="ui-inputfield"
           placeholder="Nume persoană de contact">
           <input type="text" name="OrganizationContactPhone-' . $num . '" id="OrganizationContactPhone-' . $num . '"
           class="ui-inputfield"
           placeholder="Telefon persoană de contact">
           <input type="text" name="OrganizationContactEmail-' . $num . '" id="OrganizationContactEmail-' . $num . '"
           class="ui-inputfield"
           placeholder="Email persoană de contact">
           <p><b>' . ($num - 1) . '. Pachet sub-organizație</b></p>
           <select name="secondaryOrganizationType[]"
            class="ui-selectonemenu"
            onchange="javascript: $.calcPackages(value);"
            data-value="' . $num . '" autocomplete="off">
        <option value="0">
            Alegeți un pachet
        </option>';

                foreach ($this->content_model->packages() as $p) {
                    $div .= '<option value="' . $num . '-' . $p->id . '">' . $p->intro_hu . '</option>';
                }

                $div .= '</select>
                <p><b>Alegerea consultantului</b> <i>(nu este obligatorie)</i></p>
                                                    <select name="mentor[]" id="mentor" class="ui-selectonemenu mentor" autocomplete="off">
                                                        <option value="0">Alegeți un consultant (opțional)</option>';

                foreach ($this->user_model->user(0, 0, 1) as $m) {

                    $div .= '<option value="' . $m->id . '">' . $m->name;
                    if ($m->specialization != '') {
                        $div .= ' | Specializare: ' . $m->specialization;
                    }
                    if ($m->county != '') {
                        $div .= ' | Județ:';
                        $county = explode(',', $m->county);
                        $i = 1;
                        foreach ($county as $c) {
                            if ($c != '') {
                                $cdo = $this->content_model->county($c[0]);
                                $cname = $cdo[0]->name;
                                $div .= ' ' . $cname;
                                if ($i < count($county)) {
                                    $div .= ', ';
                                }
                                $i++;
                            }
                        }
                    }
                    $div .= '</option>';

                }

                $div .= '</select>
</div>
</div>';


                echo $div;
                $this->session->set_userdata('packform', $num);

            }
        }
    }

//csoportos regisztráció megrendelés kezelése
    function groupPackageAddToCart()
    {
//$e = explode('-', $this->input->post('add'));

        if ($this->session->userdata('cart')) {
            $cart = $this->session->userdata('cart');
        } else {
            $cart = array();
        }


        if ($this->input->post('add') == 1) {
            $percent = 1;
        } elseif ($this->input->post('add') > 1 and $this->input->post('add') <= 4) {
            $percent = 10 - (count($cart) - 1);
        } else {
            $percent = 6;
        }


        $cart[$this->input->post('add')] = array(
            'name' => $this->input->post('name'),
            'email' => $this->input->post('email'),
            'tax_number' => $this->input->post('tax_number'),
            'contact_person' => $this->input->post('contact_person'),
            'contact_phone' => $this->input->post('contact_phone'),
            'type' => $this->input->post('type'),
            'billing_country' => $this->input->post('billing_country'),
            'billing_zip' => $this->input->post('billing_zip'),
            'billing_city' => $this->input->post('billing_city'),
            'billing_district' => $this->input->post('billing_district'),
            'billing_street_name' => $this->input->post('billing_street_name'),
            'billing_street_type' => $this->input->post('billing_street_type'),
            'billing_house_nr' => $this->input->post('billing_house_nr'),
            'billing_block' => $this->input->post('billing_block'),
            'billing_entrance' => $this->input->post('billing_entrance'),
            'billing_floor' => $this->input->post('billing_floor'),
            'billing_door' => $this->input->post('billing_door'),
            'package' => $this->input->post('package'),
            'mentor' => $this->input->post('mentor')
        );


        $this->session->set_userdata('cart', $cart);

        echo '1';
    }

    //group registration order summary
    function groupCart()
    {

        $this->session->unset_userdata('group');


        $msg = '
<div class="ui-g">
    <div class="ui-g-12">
        <table style="width: 100%;" cellpadding="2" cellspacing="0">
            <thead>
            <tr>
                <th align="left">' . $this->lm->t('manager_org') . '</th>
                <th align="left">' . $this->lm->t('manager_pack') . '</th>
                <th align="right">' . $this->lm->t('content_price') . '</th>
                <th align="right">' . $this->lm->t('content_price_disc') . '</th>
                <th align="right">' . $this->lm->t('content_price_all') . '</th>
            </tr>
            </thead>
            <tbody>';
        $cart = $this->session->userdata('cart');
        ksort($cart);
        $all = 0;
        $s1 = 'background-color: #E1E1E1;';
        $s2 = 'background-color: #FFFFFF;';
        $i = 1;
        $n = 0;
        $count = 0;
        foreach ($cart as $c) {
            if ($c['tax_number'] != '') {
                $this->db->like('tax_number', $c['tax_number'], 'both');
                $q = $this->db->get('users');

                if ($q->num_rows() > 0) {
                    foreach ($q->result() as $row) {

                        $sql = "select id from " . $this->db->dbprefix('users') . " where id='" . $row->id . "' or group_id='" . $row->id . "'";
                        $qq = $this->db->query($sql);
                        if ($qq->num_rows() > 0) {
                            $this->session->set_userdata('group', count($qq->result()));

                        }

                    }
                }
            }

            if (!is_int($i / 2)) {
                $style = $s1;
            } else {
                $style = $s2;
            }
            $package = $this->content_model->packages($c['package']);
            $msg .= '
            <tr style="' . $style . '">';

            $msg .= '
                <td align="left"><b>' . $c['name'] . '</b> <br><small>(' . $this->config->item('orgtype')[$c['type']] . ')</small></td>
                ';


            $msg .= '
                <td align="left">' . $package[0]->intro_hu . '</td>
                ';

            //Verificarea înregistrării naționalității
            if (is_int(strpos($this->content_model->slug($c['name']), 'nemzetisegi')) and $c['type'] == 'ONK') {
                $n++;
                if ($n <= (count($cart) - 1)) {
                    $price = 0;
                } else {
                    $price = $package[0]->price_huf;
                }
            } else {
                $price = $package[0]->price_huf;
            }


            //meglévő szervezet esetén főszervezetnek nem számol
            if ($this->session->userdata('group') and $count == 0) {
                $price = 0;
            }


            $msg .= '
                <td align="right">' . number_format(($price * 12), 0, ',', ' ') . ' LEI + TVA/AN</td>
                ';
            $msg .= '
                <td align="right">';


            if (!$this->session->userdata('group')) {
                if (count($cart) == 2) {
                    $msg .= '10';
                    $sz = 0.9;
                } elseif (count($cart) == 3) {
                    $msg .= '20';
                    $sz = 0.8;
                } elseif (count($cart) == 4) {
                    $msg .= '30';
                    $sz = 0.7;
                } elseif (count($cart) >= 4) {
                    $msg .= '40';
                    $sz = 0.6;
                } else {
                    $msg .= '0';
                    $sz = 1;
                }
            } else {
                if ($this->session->userdata('group') == 2) {
                    $msg .= '10';
                    $sz = 0.9;
                } elseif ($this->session->userdata('group') == 3) {
                    $msg .= '20';
                    $sz = 0.8;
                } elseif ($this->session->userdata('group') == 4) {
                    $msg .= '30';
                    $sz = 0.7;
                } elseif ($this->session->userdata('group') >= 4) {
                    $msg .= '40';
                    $sz = 0.6;
                } else {
                    $msg .= '0';
                    $sz = 1;
                }
            }

            $tsz = 1;
            if ($c['type'] == 'EUSZ' or $c['type'] == 'ONK' or $c['type'] == 'OKT') {
                $msg .= ' (+10)';
                $tsz = 0.9;
            }
            $msg .= '%
                </td>
                ';
            $msg .= '
                <td align="right">';


            $msg .= number_format((($price * $tsz) * 12) * $sz, 0, ',', ' ');
            $all = $all + ((($price * $tsz) * 12) * $sz);

            $msg .= ' LEI + TVA/AN
                </td>
                ';
            $msg .= '
            </tr>
            ';

            $i++;

            if ($this->session->userdata('group') and $count == 0) {
                $msg = '
<div class="ui-g">
    <div class="ui-g-12">
        <table style="width: 100%;" cellpadding="2" cellspacing="0">
            <thead>
            <tr>
                <th align="left">' . $this->lm->t('manager_org') . '</th>
                <th align="left">' . $this->lm->t('manager_pack') . '</th>
                <th align="right">' . $this->lm->t('content_price') . '</th>
                <th align="right">' . $this->lm->t('content_price_disc') . '</th>
                <th align="right">' . $this->lm->t('content_price_all') . '</th>
            </tr>
            </thead>
            <tbody>';
                $i - 1;
            }
            $count++;
        }
        $msg .= '
            <tr>';
        $msg .= '
                <td align="left"><b>Total:</b></td>
                ';
        $msg .= '
                <td>&nbsp;</td>
                ';
        $msg .= '
                <td>&nbsp;</td>
                ';
        $msg .= '
                <td>&nbsp;</td>
                ';
        $msg .= '
                <td align="right"><b>' . number_format($all, 0, ',', ' ') . ' LEI + TVA/AN</b></td>
                ';
        $msg .= '
            </tr>
            ';
        $msg .= '
            </tbody>
        </table>
    </div>
</div>';
        echo $msg;
    }

//csoportos megrendelés rendelés feldolgozása
    function groupPackageOrder()
    {
        if ($this->input->post('order')) {
            $cart = $this->session->userdata('cart');
            $j = 1;
            foreach ($cart as $c) {
                if ($c['name'] == '' or $c['billing_zip'] == '' or $c['billing_city'] == '') {
                    $sql = "insert into organization (name, address, contact_phone, email, tax_number, contact_name, category)
values
('" . $c['name'] . "',
'" . $c['billing_zip'] . " " . $c['billing_city'] . " " . $c['billing_address'] . "',
'" . $c['contact_phone'] . "',
'" . $c['email'] . "',
'" . $c['tax_number'] . "',
'" . $c['contact_person'] . "',
'" . $c['type'] . "'
)";


                    $this->db->query($sql);

                    $sql = "SELECT id FROM organization ORDER BY id DESC limit 0,1";
                    $q = $this->db->query($sql);
                    $row = $q->row();
                    $organization_id = $row->id;

                    if ($c['first'] == 1) {
                        $gid = 0;
                    } else {
                        $gid = $this->session->userdata('gid');
                    }


                    $data = array(
                        'organization_id' => $organization_id,
                        'email' => $c['email'],
                        'name' => $c['name'],
                        'billing_zip' => $c['billing_zip'],
                        'billing_city' => $c['billing_city'],
                        'billing_address' => $c['billing_address'],
                        'delivery_zip' => '',
                        'delivery_city' => '',
                        'delivery_address' => '',
                        'tax_number' => $c['tax_number'],
                        'contact_person' => $c['contact_person'],
                        'contact_phone' => $c['contact_phone'],
                        'contact_email' => $c['contact_email'],
                        'newsletter' => '0',
                        'mentor_id' => '0',
                        'group_id' => $gid,
                        'level' => '0',
                        'block' => '1',
                        'package_id' => $c['product'],
                        'package_date' => date('Y-m-d H:i:s'),
                        'registration_date' => date('Y-m-d H:i:s'),
                        'registration_ip' => $_SERVER['REMOTE_ADDR']
                    );

                    $this->db->insert('users', $data);

                    if ($c['first'] == 1) {

                        $sql = "SELECT id, contact_person, contact_email FROM " . $this->db->dbprefix('users') . " ORDER BY id DESC limit 0,1";
                        $q = $this->db->query($sql);
                        $row = $q->row();
                        $this->session->set_userdata('gid', $row->id);
                        $this->session->set_userdata('gus', $row->contact_person);
                        $this->session->set_userdata('gue', $row->contact_email);
                    }
                }


            }


            $this->load->library('MY_PHPMailer');

            $mail = new PHPMailer\PHPMailer\PHPMailer();
            $mail->isSMTP();
            $mail->SMTPSecure = $this->config->item('email_secure');
            $mail->SMTPDebug  = $this->config->item('email_smtpdebug');
            $mail->Host = $this->config->item('email_host');
            $mail->Port = $this->config->item('email_port');
            $mail->SMTPAuth = $this->config->item('email_smtpauth');
            $mail->Username = $this->config->item('email_user');
            $mail->Password = $this->config->item('email_pass');
            $mail->setFrom($this->config->item('noreply_email'), $this->config->item('title'));
            $mail->addReplyTo($this->config->item('noreply_email'), $this->config->item('title'));
            $mail->addAddress($this->session->userdata('gue'), $this->session->userdata('gus'));
            $mail->Subject = 'Înregistrarea cu succes - ' . $this->config->item('title');

            $mail->Body = '';
            $mail->IsHTML(true);
            $mail->CharSet = 'UTF-8';

            /*if ($mail->send()) {
            redirect('sikeres-regisztracio');
            }*/


            $this->session->unset_userdata('gid');
            $this->session->unset_userdata('gus');
            $this->session->unset_userdata('gue');
            $this->session->unset_userdata('cart');
            echo '1';
        } else {
            echo $this->lm->t('error_unknown');
        }
    }

    //add a unique personal data type
    function updtAdd()
    {
        $msg = '
<tr>
    <td width="25%">
        <input type="text" name="name_upd[]" value="" class="form-control form-control-sm"  maxlength="255" placeholder="Nume">
    </td>
    <td><input type="number" min="0" name="store_time_upd[]" value=""
               class="form-control form-control-sm" placeholder="Data expirării"></td>
    <td><select name="unit_upd[]" class="form-control form-control-sm" autocomplete="off">
            <option value="YEAR">' . $this->lm->t('_year') . '
            </option>
            <option value="MONTH">' . $this->lm->t('_month') . '
            </option>
            <option value="WEEK">' . $this->lm->t('_week') . '
            </option>
            <option value="DAY">' . $this->lm->t('_day') . '
            </option>
        </select></td>

    <td><div class="form-group form-check"><input type="checkbox" name="upd[]" class="form-check-input" value="1"><label class="form-check-label">' . $this->lm->t('manager_temp_spec_data') . '</label></td>
    <td width="25%"><select name="special_upd[]" class="form-control form-control-sm" autocomplete="off">
            <option value="0">' . $this->lm->t('manager_select') . '</option>
            ';

        foreach ($this->specialdatatype as $k => $v) {

            $msg .= '
            <option value="' . $k . '" title="' . $v . '">' . $this->content_model->cut_desc($v, 100) . '</option>
            >';

        }

        $msg .= '</select></td>
</tr>';
        echo $msg;
    }

//verificarea numărului taxei de înregistrare a grupului
    function gtaxcheck()
    {
        if ($this->input->get('gtax')) {
            $gtax = explode('-', trim(xss_clean(htmlspecialchars($this->input->get('gtax')))));

            $sql = "select *  from " . $this->db->dbprefix('users') . "  where tax_number like '%" . $gtax[0] . "%' and group_id IS NULL ";
            $q = $this->db->query($sql);


            if ($q->num_rows() < 1) {
                //echo $sql;
                echo $this->lm->t('error_tax_number_not');
            } else {
                foreach ($q->result() as $row) {
                    $type = '';
                    $sql = "select category from organization where id='" . $row->organization_id . "'";
                    $qq = $this->db->query($sql);
                    if ($qq->num_rows() > 0) {
                        $qr = $qq->row();
                        $type = $qr->category;
                    }
                    $cart[0] = array(
                        'name' => $row->name,
                        'email' => $row->email,
                        'tax_number' => $row->tax_number,
                        'contact_person' => $row->contact_person,
                        'contact_phone' => $row->contact_phone,
                        'type' => $type,
                        'billing_country' => 'Magyarország',
                        'billing_zip' => $row->billing_zip,
                        'billing_city' => $row->billing_city,
                        'billing_district' => $row->billing_district,
                        'billing_street_name' => $row->billing_street_name,
                        'billing_street_type' => $row->billing_street_type,
                        'billing_house_nr' => $row->billing_house_nr,
                        'billing_block' => $row->billing_block,
                        'billing_entrance' => $row->billing_entrance,
                        'billing_floor' => $row->billing_floor,
                        'billing_door' => $row->billing_door,
                        'package' => $row->package_id);


                    $this->session->set_userdata('cart', $cart);
                    $this->session->set_userdata('gsub', '1');

                }
                echo '1';
            }
        }
    }

    //Add group request sub-organization
    function AjCsopAdd()
    {
        $content = '';
        if ($this->input->post('add')) {
            $content = '
<div class="ui-g">
    <div class="ui-g-2 ui-sm-12">' . $this->input->post('add') . '. Detalii despre sub-organizație.</div>
    <div class="ui-g-3 ui-sm-12">
        <input type="text" name="orgName[]"
               value=""
               class="ui-inputfield"
               placeholder="' . ($this->input->post('add') + 1) . '. Numele organizației">
    </div>
    <div class="ui-g-3 ui-sm-12">
        <select name="type[]"
                class="ui-selectonemenu">
            <option value="0">' . $this->lm->t('manager_org_type') . '
            </option> ';
            foreach ($this->config->item('orgtype') as $k => $v) {

                $content .= '<option value="' . $k . '">' . $v . '</option>';
            }

            $content .= '</select>

    </div>
    <div class="ui-g-3 ui-sm-12">
        <select name="orgPackage[]" autocomplete="off"
                class="ui-selectonemenu">
            <option value="0">' . $this->lm->t('error_pack_select') . '</option>
            ';


            foreach ($this->content_model->packages() as $p) {
                $content .= '
            <option value="' . $p->id . '">' . $p->name_hu . ' - ' . $p->intro_hu . ' - ' . number_format(($p->price_huf
                        * 12), 0, ',', ' ') . ' LEI + TVA/AN
            </option>
            ';

            }

            $content .= '</select></div>
</div>';
        }
        echo $content;

    }

    //legal advice interest
    function lacontact()
    {
        if ($this->input->post('name')) {
            $ladata = array(
                'name' => $this->input->post('name'),
                'email' => $this->input->post('contact_email'),
                'contact_phone' => $this->input->post('contact_phone'),
                'contact_person' => $this->input->post('contact_name'),
                'zip' => $this->input->post('zip'),
                'city' => $this->input->post('city'),
                'address' => $this->input->post('address'),
                'latype' => $this->input->post('la1') . ',' . $this->input->post('la2') . ',' . $this->input->post('la3'),
                'client' => '0',
                'ladate' => date('Y-m-d H:i:s')
            );
            $this->db->insert('legal_advice', $ladata);


            $this->load->library('MY_PHPMailer');

            $mailla = new PHPMailer\PHPMailer\PHPMailer();
            $mailla->isSMTP();
            $mailla->SMTPSecure = $this->config->item('email_secure');
            $mailla->SMTPDebug  = $this->config->item('email_smtpdebug');
            $mailla->Host = $this->config->item('email_host');
            $mailla->Port = $this->config->item('email_port');
            $mailla->SMTPAuth = $this->config->item('email_smtpauth');
            $mailla->Username = $this->config->item('email_user');
            $mailla->Password = $this->config->item('email_pass');
            $mailla->setFrom($this->config->item('noreply_email'), $this->config->item('title'));
            $mailla->addReplyTo($this->config->item('noreply_email'), $this->config->item('title'));
            $mailla->addAddress($this->config->item('legal_email'), $this->config->item('legal_name'));
            $mailla->addBCC($this->config->item('orders_email'), $this->config->item('title'));
            $mailla->addBCC($this->config->item('boss_email'), $this->config->item('title'));
            $mailla->Subject = 'GDPREG interes in consiliere juridică - ' . $this->config->item('title');


            $mailla->Body = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head><title>' . $this->config->item('title') . '</title></head>

<body style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000;" bgcolor="#ffffff"
      topmargin="0" rightmargin="0"
      bottommargin="0" leftmargin="0">

<table cellpadding="0" cellspacing="0" border="0" width="650" bgcolor="#ffffff"
       style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000;">
    <tr>
        <td width="650" align="left" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" width="650"
                   style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000;">
                <tr>
                    <td width="25">&nbsp;</td>
                    <td width="600" align="left" valign="top"
                        style="color:#282828; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px;">

                        <p><b>Dragă ' . $this->config->item('legal_name') . '!</b></p>

                        <p>Următoarea organizație este interesată de subiectele enumerate mai jos. Contactați-i.</p>


                        <table width="400px" border="1" cellpadding="3"
                               style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000;"
                               cellspacing="0">
                            <tr>
                                <td>Nume:</td>
                                <td>' . $this->input->post('name') . '</td>
                            </tr>
                            <tr>
                                <td>Nume persoană de contact:</td>
                                <td>' . $this->input->post('contact_name') . '</td>
                            </tr>
                            <tr>
                                <td>Telefon:</td>
                                <td>' . $this->input->post('contact_phone') . '</td>
                            </tr>
                            <tr>
                                <td>Adresa E-mail:</td>
                                <td>' . $this->input->post('contact_email') . '</td>
                            </tr>
                            <tr>
                                <td>Adresa:</td>
                                <td>' . $this->input->post('zip') . ' ' . $this->input->post('city') . ', ' . $this->input->post('address') . '</td>
                            </tr>
                            <tr>
                                <td>Subiecte:</td>
                                <td><ul>';

            if ($this->input->post('la1') == 1) {
                $mailla->Body .= '<li>Consultanță juridică</li>';
            }
            if ($this->input->post('la2') == 1) {
                $mailla->Body .= '<li>Pregătire GDPR</li>';
            }
            if ($this->input->post('la3') == 1) {
                $mailla->Body .= '<li>Serviciul DPO</li>';
            }

            $mailla->Body .= '</ul></td>
                            </tr>
                        </table>
                        <br/>
        
                    </td>
                    <td width="25">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
';
            $mailla->IsHTML(true);
            $mailla->CharSet = 'UTF-8';
            if ($mailla->send()) {
                $mailla->clearAddresses();

            }
            echo '1';

        } else {
            echo $this->lm->t('error_unknown');;
        }
    }

    //delete last item from cart
    function dcse()
    {

        $c = $this->session->userdata('cart');
        unset($c[count($c) - 1]);
        $this->session->set_userdata('cart', $c);
        echo '1';
    }

//rendszerhasználati szerződés generálás
    function suaGen()
    {
        echo $this->pdf_model->suagen($this->input->post('usr'));
    }

//mukamenet idő emelés
    function sesstime()
    {
        $this->session->set_userdata('last_activity', time());
        echo $this->session->userdata('last_activity');

    }

    //sablon rendezés
    function tempdown()
    {
        if ($this->input->post('id')) {
            $id = trim(xss_clean(htmlspecialchars($this->input->post('id'))));
            $sql = "select `order`, `category` from data_management_templates where id='" . $id . "'";
            $q = $this->db->query($sql);
            if ($q->num_rows() > 0) {
                $row = $q->row();
                if ($row->order > 1) {
                    $sql = "update data_management_templates set `order`='" . $row->order . "' where category='" . $row->category . "' and `order`='" . ($row->order - 1) . "'";
                    $this->db->query($sql);

                    $sql = "update data_management_templates set `order`='" . ($row->order - 1) . "' where id='" . $id . "'";
                    $this->db->query($sql);
                    echo '1';
                } else {
                    echo $this->lm->t('error_order');
                }

            } else {
                echo $this->lm->t('error_id');
            }
        }
    }


    function tempup()
    {
        if ($this->input->post('id')) {
            $id = trim(xss_clean(htmlspecialchars($this->input->post('id'))));
            $sql = "select `order`, `category` from data_management_templates where id='" . $id . "'";
            $q = $this->db->query($sql);
            if ($q->num_rows() > 0) {
                $row = $q->row();

                $sql = "select id from data_management_templates where category='" . $row->category . "'";
                $qq = $this->db->query($sql);
                $qn = $qq->num_rows();

                if ($row->order < $qn) {
                    $sql = "update data_management_templates set `order`='" . $row->order . "' where category='" . $row->category . "' and `order`='" . ($row->order + 1) . "'";
                    $this->db->query($sql);

                    $sql = "update data_management_templates set `order`='" . ($row->order + 1) . "' where id='" . $id . "'";
                    $this->db->query($sql);
                    echo '1';
                } else {
                    echo $this->lm->t('error_order');
                }
            } else {
                echo $this->lm->t('error_id');
            }
        }

    }

    //group registration member deletion
    function dge()
    {
        if ($this->input->post('id')) {
            $cart = $this->session->userdata('cart');
            unset($cart[$this->input->post('id')]);
            $ncart = array();
            foreach ($cart as $c) {
                $ncart[] = $c;
            }
            $this->session->set_userdata('cart', $ncart);
            echo '1';
        }
    }

    //demouser létrehozás
    function dmousr()
    {
        if ($this->input->post('id')) {
            $this->user_model->demouser_insert($this->input->post('id'), $this->input->post('name'));
            echo '1';
        }
    }

    //mentor aktiváló levél küldése - mentor activation
    function mentAct()
    {
        if ($this->input->post('id')) {
            $this->db->where('id', $this->input->post('id'));
            $this->db->where('level >', '0');
            $q = $this->db->get('users');
            if ($q->num_rows() > 0) {
                $row = $q->row();
                $this->load->library('MY_PHPMailer');

                $mailla = new PHPMailer\PHPMailer\PHPMailer();
                $mailla->isSMTP();
                $mailla->SMTPSecure = $this->config->item('email_secure');
                $mailla->SMTPDebug  = $this->config->item('email_smtpdebug');
                $mailla->Host = $this->config->item('email_host');
                $mailla->Port = $this->config->item('email_port');
                $mailla->SMTPAuth = $this->config->item('email_smtpauth');
                $mailla->Username = $this->config->item('email_user');
                $mailla->Password = $this->config->item('email_pass');
                $mailla->setFrom($this->config->item('noreply_email'), $this->config->item('title'));
                $mailla->addReplyTo($this->config->item('noreply_email'), $this->config->item('title'));
                $mailla->addAddress($row->email, $row->name);
                $mailla->Subject = 'Înregistrarea consultant reusita - ' . $this->config->item('title');


                $mailla->Body = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head><title>' . $this->config->item('title') . '</title></head>

<body style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000;" bgcolor="#ffffff"
      topmargin="0" rightmargin="0"
      bottommargin="0" leftmargin="0">

<table cellpadding="0" cellspacing="0" border="0" width="650" bgcolor="#ffffff"
       style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000;">
    <tr>
        <td width="650" align="left" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" width="650"
                   style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000;">
                <tr>
                    <td width="25">&nbsp;</td>
                    <td width="600" align="left" valign="top"
                        style="color:#282828; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px;">

                        <p><b>Dragă ' . $row->name . '!</b></p>
                        <p>Mulţumim cî ne-ai retrimis contractul de consultanţ, te salutăm între consultanţii platformei GDPREG.</p>
                        <p>Trimitem linkul necesar la activarea contului de consultant GDPREG:<a href="' . base_url('aktivalas/' . $this->encrypt_model->te($row->email)) . '" target="_blank">ACTIVARE CONT</a></p>
                        <p>După activare vei avea acces la interfata administrativă ale consultanţilor, unde poţi urmări înregistrarea organizaţiilor care ţi-au fost ataşate, comisioanele.</p>
                        <p>Aici poţi accesa intefata  <a href="' . $this->config->item('demo') . '">' . $this->config->item('demo') . '</a> a platformei GDPREG cu aceeaşi date de identificare: <a href="https://demo.gdpr-crest.ro">https://demo.gdpr-crest.ro</a> </p>        
                        <p>Aceasta este un pachet MIKRO cu 10 persoane evidenţiate, cu şabloane model care ajută testarea. Funcţionalitatea corespunde cu cel al softverului, dar alt utilizator nu se poate înregistra. Te rugăm să exersezi utilizarea, să menţioneazi observaţiile, propunerile sprijinitoare, eventualele defecte, să ajuţi în dezvoltare, ca să înlesnim munca proprie şi al clienţilor.</p>
                        <p>În curând te vom anunţa despre următoarea conferinţă de web, asigurăm şi alte materiale pentru pregătire.</p>
                        <p>În speranţa unei colaborări de succes, <br />stăm la dispoziţie pentru întrebări:</p>
                        <p>Botond Heija<br>administrator
                        <br />Telefon/Fax:+40-(0)261-877770,+40-(0)261-877771 <br />
                        <a href="mailto:office@crest.ro">office@crest.ro</a></p>
                    </td>
                    <td width="25">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
';
                $mailla->IsHTML(true);
                $mailla->CharSet = 'UTF-8';
                if ($mailla->send()) {
                    $mailla->clearAddresses();
                    $data = array('active_date' => date('Y-m-d H:i:s'), 'activator' => $this->session->userdata('user_id'));
                    $this->db->where('id', $row->id);
                    $this->db->update('users', $data);

                }
                echo '1';

            } else {
                echo $this->lm->t('error_id');
            }
        } else {
            echo $this->lm->t('error_id');
        }
    }


    function groupdel()
    {
        $this->session->unset_userdata('cart');
        $this->session->unset_userdata('gsub');
        $this->session->unset_userdata('group');
        echo '1';
    }


}

/* End of file ajax.php */
/* Location: ./application/controllers/ajax.php */